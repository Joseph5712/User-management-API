const express = require("express");
const { register, login } = require("../controllers/auth.controller");
const { registerValidator, loginValidator } = require("../validators/auth.validator");
const { validate } = require("../middlewares/validate.middleware");

const router = express.Router();


//aqui importa el orden, primero las validaciones, luego el middleware de validacion, y por ultimo el controlador o sea el backend
router.post("/register", registerValidator, validate, register);
router.post("/login", loginValidator, validate, login);

module.exports = router;