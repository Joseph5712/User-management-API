const express = require("express");
const { requireAuth } = require("../middlewares/auth.middleware");
const { getMe } = require("../controllers/users.controller");

const router = express.Router();

// Ruta protegida: solo entra quien tenga token válido
router.get("/me", requireAuth, getMe);

module.exports = router;
