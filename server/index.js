require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = 3000;

mongoose.set("strictQuery", false);

const createRouter = require("./routes/Create");

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on("error", (error) => {
  console.log(error);
});
db.once("open", () => console.log("Connected to database..."));

app.use("/create", createRouter);

app.listen(PORT, () => {
  console.log("Connected to server...");
});
