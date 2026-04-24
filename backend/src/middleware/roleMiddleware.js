const roleMiddleware = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            const userRole = req.user.role;

            if (!allowedRoles.includes(userRole)) {
                return res.status(403).json({
                    error: "Access denied"
                });
            }

            next();
        } catch (error) {
            return res.status(500).json({
                error: "Role check failed"
            });
        }
    };
};

module.exports = roleMiddleware;