require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());

const PORT = 3000;

mongoose.set("strictQuery", false);

const createRouter = require("./routes/Create");
const voteRouter = require("./routes/Vote");

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on("error", (error) => {
  console.log(error);
});
db.once("open", () => console.log("Connected to database..."));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/create", createRouter);
app.use("/vote", voteRouter);

app.listen(PORT, () => {
  console.log("Connected to server...");
});
