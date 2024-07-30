// src/index.js
const express = require("express");
const bodyParser = require("body-parser");
const commandRoutes = require("./routes/command");
require("dotenv").config();

const app = express();

app.use(
  bodyParser.json({
    verify: (req, res, buf, encoding) => {
      try {
        JSON.parse(buf.toString(encoding));
      } catch (e) {
        res.status(400).send({ error: "Invalid JSON format" });
      }
    },
  })
);
app.use("/api", commandRoutes);

module.exports = app;
