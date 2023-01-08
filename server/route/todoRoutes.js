const express = require("express");
const isLogged = require('../middleware/isLogged');

const {
    home,
    createTodo,
    getTodos,
    editTodo,
    deleteTodo,
    isCompleted,
    // searchTodo
} = require("../controllers/todoController");

const router = express.Router();

router.get("/", home);
router.post("/createTodo", createTodo);
router.get("/getTodos", getTodos);
router.put("/editTodo/:id", editTodo);
router.delete("/deleteTodo/:id", deleteTodo);
router.put("/isCompleted/:id", isCompleted);
// router.get("/searchTodo/:id", searchTodo);



module.exports = router;
