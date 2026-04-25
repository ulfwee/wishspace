const BaseModel = require('./BaseModel');

class Booking extends BaseModel{
     constructor(bookData = {}){
        super("bookings");

        this.uid = bookData.uid || null;
        this.itemId = bookData.itemId || null;
        this.bookerId = bookData.bookerId || null;
        this.ownerId = bookData.ownerId || null;
        this.isAnonymous = this.validateBool(bookData.isAnonymous);
    }

    toData() {
        return {
            itemId: this.itemId,
            bookerId: this.bookerId,
            ownerId: this.ownerId,
            isAnonymous: this.isAnonymous
        };
    }
}

module.exports = Booking;