const BaseModel = require('./BaseModel');

class Notification extends BaseModel {
    constructor(notifData = {}) {
        super("notifications");

        this.uid = notifData.uid || null;
        this.recipientId = notifData.recipientId || null;
        this.senderId = notifData.senderId || null;
        this.message = notifData.message || "";
        this.isRead = this.validateBool(notifData.isRead);
        this.type = this.validateType(notifData.type);
        this.relatedId = notifData.relatedId || null;
        
        // === NEW FIELDS FOR EVENT REMINDERS ===
        this.eventDate = notifData.eventDate || null;
        this.daysLeft = notifData.daysLeft || null;
        this.eventCategory = notifData.eventCategory || null;
        this.friendName = notifData.friendName || null;
    }

    validateType(value) {
        const allowed = ["friend_request", "event_reminder", "item_booked"];
        if (!allowed.includes(value)) {
            return "";
        }
        return value;
    }

    validateBool(value) {
        return value === true || value === "true" || value === 1;
    }

    toData() {
        return {
            recipientId: this.recipientId,
            senderId: this.senderId,
            type: this.type,
            message: this.message,
            isRead: this.isRead,
            relatedId: this.relatedId,
            
            // === NEW FIELDS ===
            eventDate: this.eventDate,
            daysLeft: this.daysLeft,
            eventCategory: this.eventCategory,
            friendName: this.friendName,
        };
    }
}

module.exports = Notification;