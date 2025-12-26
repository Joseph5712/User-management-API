function errorHandler(err, req, res, next) {
  // 1) Defaults
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error";
  let errors = null;

  // 2) Mongo duplicate key (ej: email repetido)
  // Mongo lanza error con code 11000 cuando un campo unique se repite
  // err.keyValue trae el campo duplicado, ej: { email: "a@a.com" }
  if (err.code === 11000) {
    statusCode = 409;
    const field = err.keyValue ? Object.keys(err.keyValue)[0] : "field";
    const value = err.keyValue ? err.keyValue[field] : "";
    message = `Duplicate value for ${field}: ${value}`;
  }

  // 3) Mongoose schema validation error (required, minlength, etc.)
  // Ej: name required, password too short, etc.
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation error";
    errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
  }

  // 4) Mongoose CastError (ID con formato inválido)
  // Ej: /api/users/123 (no es ObjectId)
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // 5) JWT errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  // 6) Respuesta final estandarizada
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors ? { errors } : {}),
  });
}

module.exports = { errorHandler };
