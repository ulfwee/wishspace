const BaseModel = require('./BaseModel');

class Notification extends BaseModel{
     constructor(notifData = {}){
        super("notifications");

        this.uid = notifData.uid || null;
        this.recipientId = notifData.recipientId || null;
        this.message = notifData.message || "";
        this.isRead = this.validateBool(notifData.isRead);
        this.type = this.validateType(notifData.type);
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
            message: this.message,
            isRead: this.isRead,
            type: this.type
        };
    }
}

module.exports = Notification;