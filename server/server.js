const http = require("http");
const mongoose = require("mongoose");
const connectDb = require("./config/connectDb");
const app = require("./app");

const server = http.createServer(app);

const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("join-room", (room) => {
    if (room !== undefined) {
      socket.join(room);
      console.log("Joined room " + room);
    }
  });
});

function getSocketInstance() {
  return io;
}

connectDb();
mongoose.connection.once("open", () => {
  console.log("Connected to database...");

  server.listen(process.env.PORT, () => {
    console.log("Connected to server...");
  });
});

module.exports = { getSocketInstance };
