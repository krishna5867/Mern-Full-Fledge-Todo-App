const express = require("express");
const auth = require('../middleware/auth');

const {
    home,
    createTodo,
    getTodos,
    editTodo,
    deleteTodo,
    isCompleted,
    // search
} = require("../controllers/todoController");

const router = express.Router();

router.get("/", home);
router.post("/createTodo", createTodo);
router.get("/getTodos", getTodos);
router.put("/editTodo/:id", editTodo);
router.delete("/deleteTodo/:id", deleteTodo);
router.put("/isCompleted/:id", isCompleted);
// router.get("/search", search);



module.exports = router;
