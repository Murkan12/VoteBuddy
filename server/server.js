const http = require("http");
const mongoose = require("mongoose");
const connectDb = require("./config/connectDb");
const app = require("./app");
const { initSocket } = require("./config/socketConfig");

const server = http.createServer(app);

initSocket(server);

connectDb();
mongoose.connection.once("open", () => {
  console.log("Connected to database...");

  server.listen(process.env.PORT, () => {
    console.log("Connected to server...");
  });
});
