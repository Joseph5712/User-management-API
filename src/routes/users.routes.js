const express = require("express");
const { requireAuth } = require("../middlewares/auth.middleware");
const { requireRole } = require("../middlewares/role.middleware");
const { getMe, listUsers } = require("../controllers/users.controller");

const router = express.Router();

// Ruta protegida: solo entra quien tenga token válido
router.get("/me", requireAuth, getMe);

router.get("/", requireAuth, requireRole("ADMIN"), listUsers);

module.exports = router;
