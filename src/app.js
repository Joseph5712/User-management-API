const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const { errorHandler } = require("./middlewares/error.middleware");

const app = express();

app.use(express.json());
app.use(cors());


app.get("/health", (req, res) => {
  res.status(200).json({ ok: true, message: "API is running" });
});

app.use("/api/auth", authRoutes);

//esto siempre va al final
app.use(errorHandler);
module.exports = app;
