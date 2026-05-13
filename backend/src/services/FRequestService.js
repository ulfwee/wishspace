const FriendRequest = require('../models/FriendRequest');
const User = require('../models/User');

exports.acceptRequest = async (requestId) => {

    const requestModel = new FriendRequest();

    // отримуємо заявку
    const request = await requestModel.findById(requestId);

    if (!request) {
        throw new Error("Request not found");
    }

    // змінюємо статус
    await requestModel.update(requestId, {
        status: "accepted"
    });

    // users
    const userModel = new User();

    // sender
    const sender = await userModel.findById(
        request.senderId
    );

    // receiver
    const receiver = await userModel.findById(
        request.receiverId
    );

    // якщо friends немає
    sender.friends = sender.friends || [];
    receiver.friends = receiver.friends || [];

    // додаємо друзів
    sender.friends.push(request.receiverId);

    receiver.friends.push(request.senderId);

    // update sender
    await userModel.update(sender.uid, {
        friends: sender.friends
    });

    // update receiver
    await userModel.update(receiver.uid, {
        friends: receiver.friends
    });

    return {
        message: "Friend request accepted"
    };
};