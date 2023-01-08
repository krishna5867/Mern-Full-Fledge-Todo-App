const express = require("express");
const auth = require('../middleware/auth');

const {
    home,
    createUser,
    login,
    getUsers,
    editUser,
    deleteUser,
    logout,
} = require("../controllers/userControllers");

const router = express.Router();

router.get("/", home);
router.post("/createUser", createUser);
router.post("/login", login);
router.get("/getUsers", getUsers);
router.get("/logout", logout);
router.put("/edituser/:id", editUser);
router.delete("/deleteUser/:id", deleteUser);


module.exports = router;
