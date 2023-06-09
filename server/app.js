require("dotenv").config();

const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const connectDb = require("./config/connectDb");

const app = express();

app.use(cors({ origin: "https://votebuddy.onrender.com" }));

const createRouter = require("./routes/Create");
const voteRouter = require("./routes/Vote");

connectDb();

app.use(express.static(path.join(__dirname, "dist")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/create", createRouter);
app.use("/vote", voteRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

module.exports = app;
