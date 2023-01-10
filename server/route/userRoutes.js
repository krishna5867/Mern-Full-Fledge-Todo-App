const express = require("express");
const auth = require('../middleware/auth');

const {
    home,
    createUser,
    login,
    getUsers,
    signout,
    isloggedin
} = require("../controllers/userControllers");

const router = express.Router();

router.get("/", home);
router.post("/createUser", createUser);
router.get("/getUsers",auth, getUsers);
router.post("/login", login);
router.get("/signout", signout);
router.get("/isloggedin",auth, isloggedin);


module.exports = router;
