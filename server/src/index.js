// index.js
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectMongoDB } = require("./models/db");
const authRoutes = require("./routes/authRoutes");
const questionRoutes = require("./routes/questionRoutes");
const socket = require("./utils/socket");
const buzzerRoutes = require("./routes/buzzerRoutes");

const app = express();
const server = http.createServer(app);

// Initialize Socket.io
const io = socket.init(server);

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes 
app.use("/login", authRoutes);
app.use("/api", questionRoutes);
app.use("/api", buzzerRoutes);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
module.exports = { server };
// MongoDB connection
connectMongoDB();
