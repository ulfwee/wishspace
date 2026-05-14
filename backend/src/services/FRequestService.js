const FriendRequest = require('../models/FriendRequest');
const User = require('../models/User');

exports.sendRequest = async (senderId, receiverId) => {
    if (!senderId || !receiverId) {
        throw new Error("senderId and receiverId are required");
    }
    if (senderId === receiverId) {
        throw new Error("You cannot add yourself");
    }

    const requestModel = new FriendRequest();
    const userModel = new User();

    // Перевірка, чи вже друзі
    const sender = await userModel.findById(senderId);
    const receiver = await userModel.findById(receiverId);

    if (!sender || !receiver) {
        throw new Error("User not found");
    }

    if (sender.friends?.includes(receiverId) || receiver.friends?.includes(senderId)) {
        throw new Error("You are already friends");
    }

    // Перевірка на існуючий запит
    const existing = await requestModel.collection
        .where('senderId', '==', senderId)
        .where('receiverId', '==', receiverId)
        .get();

    if (!existing.empty) {
        throw new Error("Request already sent");
    }

    const newRequest = new FriendRequest({
        senderId,
        receiverId,
        status: "pending"
    });

    return await requestModel.create(newRequest.toData());
};

exports.getIncomingRequests = async (userId) => {
    if (!userId) {
        throw new Error("User ID is required");
    }

    const requestModel = new FriendRequest();
    const userModel = new User();

    const requests = await requestModel.findByField('receiverId', userId);
    
    const enrichedRequests = await Promise.all(requests.map(async (req) => {
        const sender = await userModel.findById(req.senderId);
        return {
            ...req,
            senderUsername: sender ? sender.username : "Unknown",
            uid: req.id 
        };
    }));

    return enrichedRequests.filter(req => req.status === 'pending');
};

exports.acceptRequest = async (requestId) => {
    const requestModel = new FriendRequest();
    const userModel = new User();

    const request = await requestModel.findById(requestId);
    if (!request) throw new Error("Request not found");

    const sender = await userModel.findById(request.senderId);
    const receiver = await userModel.findById(request.receiverId);

    if (!sender || !receiver) throw new Error("User not found");

    sender.friends = sender.friends || [];
    receiver.friends = receiver.friends || [];

    if (sender.friends.includes(request.receiverId) || receiver.friends.includes(request.senderId)) {
        throw new Error("Users are already friends");
    }

    await requestModel.update(requestId, { status: "accepted" });

    sender.friends.push(request.receiverId);
    receiver.friends.push(request.senderId);

    await userModel.update(sender.id || sender.uid, { friends: sender.friends });
    await userModel.update(receiver.id || receiver.uid, { friends: receiver.friends });

    return { message: "Friend request accepted" };
};

exports.rejectRequest = async (requestId) => {
    const requestModel = new FriendRequest();
    return await requestModel.delete(requestId);
};


exports.getMyFriends = async (userId) => {
    if (!userId) {
        throw new Error("User ID is required");
    }

    const userModel = new User();
    const user = await userModel.findById(userId);

    if (!user?.friends?.length) {
        return [];
    }

    const friendsData = await Promise.all(
        user.friends.map(async (friendId) => {
            const friend = await userModel.findById(friendId);
            return friend ? {
                id: friend.id || friend.uid,
                uid: friend.id || friend.uid,
                username: friend.username,
                biography: friend.biography,
            } : null;
        })
    );

    return friendsData.filter(Boolean);
};