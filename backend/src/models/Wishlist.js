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
        this.eventCategory = wishlistData.eventCategory || "Other";
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

    async findPublicByUserIds(userIds) {

        try {

            if (!userIds.length) {
                return [];
            }

            const snapshot = await this.collection
                .where("userId", "in", userIds)
                .get();

            if (snapshot.empty) {
                return [];
            }

            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

        } catch (error) {

            throw new Error(
                `Error fetching friends wishlists: ${error.message}`
            );

        }
    }

    toData() {
       
        return {
            title: this.title,
            privacy: this.privacy,
            description: this.description,
            imgURL: this.imgURL,
            userId: this.userId, 
            eventCategory: this.eventCategory,
            eventDate: this.eventDate
        };
    }
}

module.exports = Wishlist;