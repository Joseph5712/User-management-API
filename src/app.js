const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());


app.get("/health", (req, res) => {
  res.status(200).json({ ok: true, message: "API is running" });
});

module.exports = app;
