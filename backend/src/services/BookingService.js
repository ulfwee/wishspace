const Booking = require('../models/Booking');
const WishItem = require('../models/WishItem');

exports.bookItem = async (data) => {
    try {
        const wishItemInstance = new WishItem();
        
        const item = await wishItemInstance.findById(data.itemId);

        const isBooked = item.isBooked === true || 
                 String(item.isBooked).toLowerCase() === 'true';

        if (isBooked) throw new Error("Item is already booked");

        if (!item) throw new Error("Item not found");
const isAlreadyBooked = item.isBooked === true || 
                       String(item.isBooked).toLowerCase() === "true";

if (isAlreadyBooked) throw new Error("Item is already booked");
        const bookingInstance = new Booking(data);
        const newBooking = await bookingInstance.create(bookingInstance.toData());

        await wishItemInstance.update(data.itemId, { isBooked: true });

        return newBooking;
    } catch (error) {
        throw new Error(`Booking failed: ${error.message}`);
    }
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