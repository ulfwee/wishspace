const BaseModel = require('./BaseModel');

class FriendRequest extends BaseModel{
     constructor(fRequestData = {}){
        super("friendrequests");

        this.uid = fRequestData.uid || null;
        this.senderId = fRequestData.senderId || null;
        this.receiverId = fRequestData.receiverId || null;
        this.status = this.validateStatus(fRequestData.status);
    }

    validateStatus(value) {
        const allowed = ["pending", "accepted", "declined"];

        if (!allowed.includes(value)) {
            return "pending"; 
        }

        return value;
    }


    toData() {
        return {
            senderId: this.senderId,
            receiverId: this.receiverId,
            status: this.status
        };
    }
}

module.exports = FriendRequest;