const express = require("express");
const auth = require('../middleware/auth');

const {
    home,
    createTodo,
    getTodos,
    editTodo,
    deleteTodo,
    isCompleted,
} = require("../controllers/todoController");

const router = express.Router();

router.get("/", home);
router.post("/createTodo",auth, createTodo);
router.get("/getTodos",auth, getTodos);
router.put("/editTodo/:id", editTodo);
router.delete("/deleteTodo/:id", deleteTodo);
router.patch("/isCompleted/:id", isCompleted);



module.exports = router;
