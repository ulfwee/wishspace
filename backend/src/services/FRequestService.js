const FriendRequest = require('../models/FriendRequest');

exports.sendRequest = async (data) => {
    const instance = new FriendRequest({
        ...data,
        status: "pending"
    });

    return await instance.create(instance.toData());
};

exports.acceptRequest = async (id) => {
    const instance = new FriendRequest();
    return await instance.update(id, { status: "accepted" });
};

exports.rejectRequest = async (id) => {
    const instance = new FriendRequest();
    return await instance.update(id, { status: "declined" });
};

exports.getIncomingRequests = async (userId) => {
    const instance = new FriendRequest();
    return await instance.findByField("receiverId", userId);
};