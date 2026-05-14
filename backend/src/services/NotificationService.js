const Notification = require('../models/Notification');
const User = require('../models/User');
const Wishlist = require('../models/Wishlist');

exports.getUserNotifications = async (userId) => {
    if (!userId) {
        throw new Error("User ID is required");
    }
    const instance = new Notification();
    return await instance.findByField("recipientId", userId);
};

exports.markAsRead = async (id) => {
    if (!id) throw new Error("Notification ID is required");
    const instance = new Notification();
    return await instance.update(id, { isRead: true });
};

exports.deleteNotification = async (id) => {
    const instance = new Notification();
    if (!id) throw new Error("Notification ID is required");
    return await instance.delete(id);
};

exports.generateUpcomingEventNotifications = async (userId) => {
    const userModel = new User();
    const wishlistModel = new Wishlist();
    const notificationModel = new Notification();

    const user = await userModel.findById(userId);
    if (!user) throw new Error("User not found");

    const friends = user.friends || [];
    if (!friends.length) return [];

    const today = new Date();

    for (const friendId of friends) {
        const wishlists = await wishlistModel.findAllByUserId(friendId);
        const friend = await userModel.findById(friendId);

        for (const wishlist of wishlists) {
            if (!wishlist.eventDate) continue;

            const eventDate = new Date(wishlist.eventDate);
            const diffTime = eventDate.getTime() - today.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays >= 0 && diffDays <= 14) {
                // Check if notification already exists
                const existing = await notificationModel.findByField("relatedId", wishlist.id);
                const alreadyExists = existing.some(n => n.recipientId === userId);

                if (!alreadyExists) {
                    await notificationModel.create({
                        recipientId: userId,
                        senderId: friendId,
                        type: "event_reminder",
                        message: `${friend.username}'s ${wishlist.eventCategory} is in ${diffDays} days`,
                        isRead: false,
                        relatedId: wishlist.id,
                        
                        // === NEW DATA ===
                        eventDate: wishlist.eventDate,
                        daysLeft: diffDays,
                        eventCategory: wishlist.eventCategory,
                        friendName: friend.username
                    });
                }
            }
        }
    }
};