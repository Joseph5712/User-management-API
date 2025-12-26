function requireRole(...allowedRoles) {
    return (req, res, next) => {
        // requireAuth ya debió poner req.user
        if (!req.user) {
            const err = new Error("Unauthorized");
            err.statusCode = 401;
            return next(err);
        }

        // Ej: allowedRoles = ["ADMIN"]
        if (!allowedRoles.includes(req.user.role)) {
            const err = new Error("Forbidden: insufficient permissions");
            err.statusCode = 403;
            return next(err);
        }

        next();
    };
}

module.exports = { requireRole };