// src/index.js
const express = require("express");
const bodyParser = require("body-parser");
const commandRoutes = require("./v1/routes/command");
const {initDatabase} = require('./config/db')
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

initDatabase()
app.use("/api/v1", commandRoutes);

module.exports = app;
