const BaseModel = require('./BaseModel');

class Wishlist extends BaseModel {
    constructor(wishlistData = {}) {
        super("wishlists");

        this.uid = wishlistData.uid || null;
        this.title = wishlistData.title || "";
        this.privacy = this.validatePrivacy(wishlistData.privacy);
        this.description = wishlistData.description || "";
        this.imgURL = wishlistData.imgURL || "";
        this.userId = wishlistData.userId || null;
        
        // ВИПРАВЛЕНО: додано this.
        this.eventCategory = wishlistData.eventCategory || "Other";
        // Якщо у тебе є дата події в логах, додай і її сюди:
        this.eventDate = wishlistData.eventDate || null;
    }

    validatePrivacy(value) {
        const allowed = ["private", "friends", "public"];
        return allowed.includes(value) ? value : "public";
    }

    async findAllByUserId(userId) {
        try {
            const snapshot = await this.collection.where("userId", "==", userId).get();
            
            if (snapshot.empty) {
                return [];
            }

            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            throw new Error(`Error fetching user wishlists: ${error.message}`);
        }
    }

    toData() {
       
        return {
            title: this.title,
            privacy: this.privacy,
            description: this.description,
            imgURL: this.imgURL,
            userId: this.userId, // Ось тут він іде в базу
            eventCategory: this.eventCategory,
            eventDate: this.eventDate
        };
    }
}

module.exports = Wishlist;