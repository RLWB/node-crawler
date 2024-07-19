// src/index.js
const express = require("express");
const bodyParser = require("body-parser");
const commandRoutes = require("./routes/command");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(
  bodyParser.json({
    verify: (req, res, buf, encoding) => {
      try {
        JSON.parse(buf.toString(encoding));
      } catch (e) {
        res.status(400).send({ error: "Invalid JSON format" });
        throw new Error("INVAID_JSON");
      }
    },
  })
);
app.use("/api", commandRoutes);

module.exports = app;
