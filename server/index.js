require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const connectDb = require("./config/connectDb");

const app = express();

app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));

const PORT = 4000;

const createRouter = require("./routes/Create");
const voteRouter = require("./routes/Vote");

connectDb();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/create", createRouter);
app.use("/vote", voteRouter);

mongoose.connection.once("open", () => {
  console.log("Connected to database...");
  app.listen(PORT, () => {
    console.log("Connected to server...");
  });
});
