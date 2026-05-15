class NotificationController {

    constructor(notificationService) {
        this.notificationService =
            notificationService;
    }

    getNotifications = async (req, res) => {

        try {

            const userId =
                req.user?.userId;

            await this.notificationService
                .generateUpcomingEventNotifications(
                    userId
                );

            const data =
                await this.notificationService
                    .getUserNotifications(
                        userId
                    );

            res.json(data);

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }
    };

    read = async (req, res) => {

        try {

            const data =
                await this.notificationService
                    .markAsRead(
                        req.params.id
                    );

            res.json(data);

        } catch (error) {

            res.status(400).json({
                message: error.message
            });

        }
    };

    delete = async (req, res) => {

        try {

            const data =
                await this.notificationService
                    .deleteNotification(
                        req.params.id
                    );

            res.json(data);

        } catch (error) {

            res.status(400).json({
                message: error.message
            });

        }
    };
}

module.exports =
    NotificationController;