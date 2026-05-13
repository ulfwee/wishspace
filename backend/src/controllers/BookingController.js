const BookingService = require('../services/BookingService');

exports.bookItem = async (req, res) => {
    try {
        const { id } = req.params; 
        const bookData = {
            itemId: id,
            bookerId: req.user.uid, 
            ownerId: req.body.ownerId,
            isAnonymous: req.body.isAnonymous || false
        };

        const result = await BookingService.bookItem(bookData);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
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