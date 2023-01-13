const express = require("express");
const auth = require('../middleware/auth');

const {
    home,
    createTodo,
    getTodos,
    editTodo,
    deleteTodo,
    isCompleted,
    searchTodo
} = require("../controllers/todoController");

const router = express.Router();

router.get("/", home);
router.post("/createTodo",auth, createTodo);
router.get("/getTodos",auth, getTodos);
router.put("/editTodo/:id",auth, editTodo);
router.delete("/deleteTodo/:id",auth, deleteTodo);
router.put("/isCompleted/:id",auth, isCompleted);
router.get("/searchTodo", searchTodo);



module.exports = router;
