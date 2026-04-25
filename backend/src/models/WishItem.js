const BaseModel = require('./BaseModel');

class WishItem extends BaseModel{
    constructor(itemData = {}){
        super("wishitems");

        this.uid = itemData.uid || null;
        this.title = itemData.title || "";
        this.price = itemData.price || "";
        this.description = itemData.description || "";
        this.link = itemData.link || "";
        this.imgURL = itemData.imgURL || "";
        this.priority = this.validatePriority(itemData.priority);
        this.wishlistId = itemData.wishlistId || null;
        this.isBooked = this.validateBool(itemData.isBooked);
    }

    validatePriority(value) {
        const allowed = ["low", "medium", "high"];

        if (!allowed.includes(value)) {
            return "medium"; 
        }

        return value;
    }

    toData() {
        return {
            title: this.title,
            price: this.price,
            description: this.description,
            link: this.link,
            imgURL: this.imgURL,
            priority: this.priority,
            wishlistId: this.wishlistId,
            isBooked: this.isBooked
        };
    }
}

module.exports = WishItem;