const FriendService = require('../services/FRequestService');

exports.sendRequest = async (req, res) => {

    try {

        const result = await FriendService.sendRequest(
            req.user.id,
            req.body.receiverId
        );

        res.status(201).json(result);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }
};

exports.accept = async (req, res) => {

    try {

        const result = await FriendService.acceptRequest(req.params.id);

        res.json(result);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }
};

exports.reject = async (req, res) => {

    try {

        const result = await FriendService.rejectRequest(req.params.id);

        res.json(result);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }
};

exports.getRequests = async (req, res) => {

    try {

        const result = await FriendService.getIncomingRequests(
            req.user.id
        );

        res.json(result);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }
};