const FriendService = require('../services/FRequestService');

exports.sendRequest = async (req, res) => {
    const result = await FriendService.sendRequest(req.body);
    res.json(result);
};

exports.accept = async (req, res) => {
    const result = await FriendService.acceptRequest(req.params.id);
    res.json(result);
};

exports.reject = async (req, res) => {
    const result = await FriendService.rejectRequest(req.params.id);
    res.json(result);
};

exports.getRequests = async (req, res) => {
    const result = await FriendService.getIncomingRequests(req.user.id);
    res.json(result);
};