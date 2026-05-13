const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            console.log("❌ No Authorization header");
            return res.status(401).json({ message: "No token provided" });
        }

        if (!authHeader.startsWith('Bearer ')) {
            console.log("❌ Invalid token format");
            return res.status(401).json({ message: "Invalid token format" });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            console.log("❌ Token is empty");
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_default_secret_key_123');

        req.user = decoded;
        console.log("✅ Auth successful, user:", decoded); 

        next();
    } catch (error) {
        console.log("❌ JWT Error:", error.message);
        return res.status(401).json({ 
            message: "Invalid token",
            error: error.message 
        });
    }
};

module.exports = authMiddleware;