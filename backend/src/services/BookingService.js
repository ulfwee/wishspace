const Booking = require('../models/Booking');

exports.bookItem = async (data) => {
    const instance = new Booking(data);
    return await instance.create(instance.toData());
};

exports.getUserBookings = async (userId) => {
    const instance = new Booking();
    return await instance.findByField("bookerId", userId);
};

exports.getWishlistBookings = async (ownerId) => {
    const instance = new Booking();
    return await instance.findByField("ownerId", ownerId);
};

exports.cancelBooking = async (id) => {
    const instance = new Booking();
    return await instance.delete(id);
};