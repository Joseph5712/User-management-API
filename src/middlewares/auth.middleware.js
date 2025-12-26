const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
    try {
        // 1) Leer header Authorization
        const authHeader = req.headers.authorization;

        // Ejemplo esperado:
        // Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            const err = new Error("Missing or invalid Authorization header");
            err.statusCode = 401;
            throw err;
        }

        // 2) Separar "Bearer" del token
        const token = authHeader.split(" ")[1];

        // 3) Verificar token (firma + expiración)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // decoded trae lo que metimos en el payload al hacer signToken:
        // { id: "...", role: "USER", iat: ..., exp: ... }

        // 4) Guardar el usuario decodificado en req para usarlo en rutas
        req.user = {
            id: decoded.id,
            role: decoded.role,
        };

        next();
    } catch (error) {
        const err = new Error("Unauthorized");
        err.statusCode = 401;
        return next(err);
    }
}

module.exports = { requireAuth };
