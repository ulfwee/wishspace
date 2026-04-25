const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/BookingController');
const auth = require('../middleware/auth');

router.post('/items/:id/book', auth, BookingController.bookItem);

router.get('/users/:id/bookings', auth, BookingController.getUserBookings);

router.get('/wishlists/:id/bookings', auth, BookingController.getWishlistBookings);

router.put('/:id/cancel', auth, BookingController.cancel);

module.exports = router;