const http = require("http");
const mongoose = require("mongoose");

const app = require("./app");
const connectDb = require("./config/connectDb");

const server = http.createServer(app);

connectDb();

mongoose.connection.once("open", () => {
  console.log("Connected to database...");

  server.listen(process.env.PORT, () => {
    console.log("Connected to server...");
  });
});

module.exports = server;
