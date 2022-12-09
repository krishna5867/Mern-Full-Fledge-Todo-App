require("dotenv").config();
const express = require("express");
const connectToDB = require("./config/db");
const userRoutes = require("./route/userRoutes");
var cookieParser = require('cookie-parser')
const cors = require("cors");
const app = express();

// Middleware
const auth = require('./middleware/auth');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors())


// MongoDb connect
connectToDB();
//Routes
app.use("/", userRoutes);

module.exports = app;

