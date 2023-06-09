let io;

function initSocket(server) {
  io = require("socket.io")(server);

  io.on("connection", (socket) => {
    console.log("connected");
    socket.on("join-room", (room) => {
      if (room !== undefined) {
        socket.join(room);
        console.log("Joined room " + room);
      }
    });
  });
}

function getSocketInstance() {
  return io;
}

module.exports = {
  initSocket,
  getSocketInstance,
};
