const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Access denied. Admin only." });
    }
    next();
};

router.get('/users', auth, async (req, res) => {
    try {
        console.log("Admin request - user:", req.user); // для дебагу

        if (req.user?.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Admin only." });
        }

        const userModel = new User();
        let users = await userModel.getDataAll();

        users = users.map(user => ({
            ...user,
            createdAt: user.createdAt ? 
                (user.createdAt.toDate ? user.createdAt.toDate().toISOString() : user.createdAt) 
                : null,
        }));

        res.json(users);
    } catch (err) {
        console.error("Admin users error:", err);
        res.status(500).json({ 
            message: err.message,
            stack: err.stack 
        });
    }
});

router.delete('/users/:id', auth, isAdmin, async (req, res) => {
    try {
        const userModel = new User();
        await userModel.delete(req.params.id);
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;