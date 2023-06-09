require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const connectDb = require("./config/connectDb");

const app = express();

app.use(cors({ origin: "https://votebuddy.onrender.com/" }));

const createRouter = require("./routes/Create");
const voteRouter = require("./routes/Vote");

connectDb();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/create", createRouter);
app.use("/vote", voteRouter);

mongoose.connection.once("open", () => {
  console.log("Connected to database...");
  app.listen(process.env.PORT, () => {
    console.log("Connected to server...");
  });
});
