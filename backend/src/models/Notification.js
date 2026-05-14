const BaseModel = require('./BaseModel');

class Notification extends BaseModel{
     constructor(notifData = {}){
        super("notifications");

        this.uid = notifData.uid || null;
        this.recipientId = notifData.recipientId || null;
        this.senderId = notifData.senderId || null;
        this.message = notifData.message || "";
        this.isRead = this.validateBool(notifData.isRead);
        this.type = this.validateType(notifData.type);
        this.relatedId = notifData.relatedId || null;
    }

    validateType(value) {
        const allowed = ["friend_request", "event_reminder", "item_booked"];

        if (!allowed.includes(value)) {
            return ""; 
        }

        return value;
    }

    toData() {
        return {
            recipientId: this.recipientId,
            senderId: this.senderId,
            type: this.type,
            message: this.message,
            isRead: this.isRead,
            relatedId: this.relatedId,
        };
    }
}

module.exports = Notification;