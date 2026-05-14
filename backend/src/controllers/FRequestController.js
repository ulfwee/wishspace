const FriendService = require('../services/FRequestService');

exports.sendRequest = async (req, res) => {
    try {
        const senderId = req.user?.userId;   

        if (!senderId) {
            return res.status(401).json({ message: "Authentication failed - userId not found" });
        }

        const { receiverId } = req.body;

        if (!receiverId) {
            return res.status(400).json({ message: "receiverId is required" });
        }

        const result = await FriendService.sendRequest(senderId, receiverId);
        res.status(201).json(result);

    } catch (error) {
        console.error("Send request error:", error);
        res.status(400).json({ message: error.message });
    }
};

exports.getRequests = async (req, res) => {
    try {
        const userId = req.user?.userId;   

        if (!userId) {
            return res.status(401).json({ message: "Authentication failed - userId not found" });
        }

        const result = await FriendService.getIncomingRequests(userId);
        res.json(result);

    } catch (error) {
        console.error("Get requests error:", error);
        res.status(400).json({ message: error.message });
    }
};

exports.accept = async (req, res) => {
    try {
        const result = await FriendService.acceptRequest(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.reject = async (req, res) => {
    try {
        const result = await FriendService.rejectRequest(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getMyFriends = async (req, res) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({ message: "Authentication failed - userId not found" });
        }

        const result = await FriendService.getMyFriends(userId);
        res.json(result);

    } catch (error) {
        console.error("Get my friends error:", error);
        res.status(500).json({ message: error.message });
    }
};