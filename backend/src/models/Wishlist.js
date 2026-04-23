const BaseModel = require('./BaseModel');

class Wishlist extends BaseModel{
    constructor(wishlistData = {}){
        super("wishlists");

        this.uid = wishlistData.uid || null;
        this.title = wishlistData.title || "";
        this.privacy = this.validatePrivacy(wishlistData.privacy);
        this.description = wishlistData.description || "";
        this.imgURL = wishlistData.imgURL || "";
        this.userId = wishlistData.userId || null;
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