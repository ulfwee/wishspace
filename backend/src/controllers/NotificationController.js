const NotificationService = require('../services/NotificationService');

exports.getNotifications = async (req, res) => {
    const data = await NotificationService.getUserNotifications(req.user.id);
    res.json(data);
};

exports.read = async (req, res) => {
    const data = await NotificationService.markAsRead(req.params.id);
    res.json(data);
};

exports.delete = async (req, res) => {
    const data = await NotificationService.deleteNotification(req.params.id);
    res.json(data);
};