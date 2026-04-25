const Notification = require('../models/Notification');

exports.getUserNotifications = async (userId) => {
    const instance = new Notification();
    return await instance.findByField("recipientId", userId);
};

exports.markAsRead = async (id) => {
    const instance = new Notification();
    return await instance.update(id, { isRead: true });
};

exports.deleteNotification = async (id) => {
    const instance = new Notification();
    return await instance.delete(id);
};