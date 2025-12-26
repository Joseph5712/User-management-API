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

async function listUsers(req, res, next) {
    try {
        // Paginación: /api/users?page=1&limit=10
        const page = Math.max(parseInt(req.query.page || "1", 10), 1);
        const limit = Math.min(Math.max(parseInt(req.query.limit || "10", 10), 1), 100);
        const skip = (page - 1) * limit;

        // filtro opcional: /api/users?search=jose
        const search = (req.query.search || "").trim();
        const filter = search
            ? {
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { email: { $regex: search, $options: "i" } },
                ],
            }
            : {};

        const [items, total] = await Promise.all([
            User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
            User.countDocuments(filter),
        ]);

        return res.status(200).json({
            success: true,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
            data: items.map((u) => ({
                id: u._id,
                name: u.name,
                email: u.email,
                role: u.role,
                createdAt: u.createdAt,
                updatedAt: u.updatedAt,
            })),
        });
    } catch (err) {
        next(err);
    }
}

module.exports = { getMe, listUsers };
