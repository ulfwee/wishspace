const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');

const NotificationController =
    require('../controllers/NotificationController');

const NotificationService =
    require('../services/NotificationService');

const notificationController =
    new NotificationController(
        NotificationService
    );

router.get(
    '/',
    auth,
    notificationController.getNotifications
);

router.put(
    '/:id/read',
    auth,
    notificationController.read
);

router.delete(
    '/:id',
    auth,
    notificationController.delete
);

module.exports = router;