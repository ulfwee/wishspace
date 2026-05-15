const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" });
        }

        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Invalid token format" });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }


        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_default_secret_key_123');

        req.user = decoded;

        next();
    } catch (error) {
        console.log("JWT Error:", error.message);
        return res.status(401).json({ 
            message: "Invalid token",
            error: error.message 
        });
    }
};

module.exports = authMiddleware;