// index.js
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectMongoDB } = require("./models/db");
const authRoutes = require("./routes/authRoutes");
const questionRoutes = require("./routes/questionRoutes");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Socket.io configuration
io.on("connection", (socket) => {
  console.log("Client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Routes 
app.use("/api", questionRoutes);
app.use("/login", authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
module.exports = { server };
// MongoDB connection
connectMongoDB();
