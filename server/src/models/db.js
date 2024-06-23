// models/db.js
const mysql = require("mysql");
const mongoose = require("mongoose");

const uri =
  "mongodb+srv://enoshrodrigo:1WeQrRQkxzpfGVHI@cluster0.vpagcwx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "gameapp",
  port: 3306,
});

module.exports = { db, connectMongoDB };