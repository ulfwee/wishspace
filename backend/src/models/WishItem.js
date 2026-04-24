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
        this.wishlistId = itemData.wishlistId || null;
        this.eventCategory = "Birthday" || "Christmas" || "Wedding" || "Anniversary" || "Thanksgiving" || "New Year" || "Other";
    }

    validatePrivacy(value) {
        const allowed = ["private", "friends", "public"];

        if (!allowed.includes(value)) {
            return "public"; 
        }

        return value;
    }

    toData() {
        return {
            title: this.title,
            privacy: this.privacy,
            description: this.description,
            imgURL: this.imgURL,
            userId: this.userId
        };
    }
}

module.exports =Wishlist;