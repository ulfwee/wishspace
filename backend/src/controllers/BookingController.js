const BookingService = require('../services/BookingService');

exports.bookItem = async (req, res) => {
    const data = await BookingService.bookItem({
        ...req.body,
        bookerId: req.user.id
    });
    res.json(data);
};

exports.getUserBookings = async (req, res) => {
    const data = await BookingService.getUserBookings(req.params.id);
    res.json(data);
};

exports.getWishlistBookings = async (req, res) => {
    const data = await BookingService.getWishlistBookings(req.params.id);
    res.json(data);
};

exports.cancel = async (req, res) => {
    const data = await BookingService.cancelBooking(req.params.id);
    res.json(data);
};