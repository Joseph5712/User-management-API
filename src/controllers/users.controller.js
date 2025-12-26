const User = require("../models/User.model");

async function getMe(req, res, next) {
    try {
        // req.user lo puso el middleware requireAuth
        const userId = req.user.id;

        // Traemos el usuario desde la BD
        const user = await User.findById(userId);

        if (!user) {
            const err = new Error("User not found");
            err.statusCode = 404;
            throw err;
        }

        return res.status(200).json({
            success: true,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        });
    } catch (err) {
        next(err);
    }
}

module.exports = { getMe };
