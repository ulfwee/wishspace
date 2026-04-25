const express = require('express');
const router = express.Router();
const FRequestController = require('../controllers/FRequestController');
const auth = require('../middleware/auth');

router.post('/request', auth, FRequestController.sendRequest);

router.put('/:id/accept', auth, FRequestController.accept);

router.put('/:id/reject', auth, FRequestController.reject);

router.get('/requests', auth, FRequestController.getRequests);

module.exports = router;