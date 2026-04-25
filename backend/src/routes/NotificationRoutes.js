const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/NotificationController');
const auth = require('../middleware/auth');

router.get('/', auth, NotificationController.getNotifications);

router.put('/:id/read', auth, NotificationController.read);

router.delete('/:id', auth, NotificationController.delete);

module.exports = router;