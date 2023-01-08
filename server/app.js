require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectToDB = require("./config/db");
const userRoutes = require("./route/userRoutes");
const todoRoutes = require("./route/todoRoutes");

// Middleware
const auth = require("./middleware/auth");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// MongoDb connect
connectToDB();

//Routes
app.use("/", userRoutes);
app.use("/", todoRoutes);

module.exports = app;
