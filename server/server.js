const http = require("http");
const mongoose = require("mongoose");
const socketIo = require("socket.io");

const app = require("./app");
const connectDb = require("./config/connectDb");

const server = http.createServer(app);

const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("join-room", (room) => {
    if (room !== undefined) {
      socket.join(room);
      console.log("Joined room " + room);
    }
  });
});

connectDb();

mongoose.connection.once("open", () => {
  console.log("Connected to database...");

  server.listen(process.env.PORT, () => {
    console.log("Connected to server...");
  });
});

module.exports = { server, io };
