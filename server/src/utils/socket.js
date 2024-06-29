// socket.js
let io;

module.exports = {
  init: (server) => {
    io = require("socket.io")(server);
    io.on("connection", (socket) => {
      console.log("Client connected");
      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized");
    }
    return io;
  },
};
