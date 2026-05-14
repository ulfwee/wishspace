const NotificationService = require('../services/NotificationService');

exports.getNotifications = async (req, res) => {
    const userId = req.user?.userId || req.user?.id;

    if (!userId) {
        return res.status(401).json({ message: "Authentication failed - userId not found" });
    }

    const data = await NotificationService.getUserNotifications(req.user.userId);
    res.json(data);
};

exports.read = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await NotificationService.markAsRead(id);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await NotificationService.deleteNotification(id);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};