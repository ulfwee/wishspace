const NotificationService = require('../services/NotificationService');

exports.getNotifications = async (req, res) => {

    try {

        const userId =
            req.user?.userId || req.user?.id;

        if (!userId) {

            return res.status(401).json({
                message:
                    "Authentication failed"
            });
        }

        await NotificationService
            .generateUpcomingEventNotifications(
                userId
            );

        const data =
            await NotificationService
                .getUserNotifications(userId);

        res.json(data);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message
        });
    }
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