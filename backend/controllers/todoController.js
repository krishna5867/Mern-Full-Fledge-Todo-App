const Todo = require("../models/todoModel");
const User = require("../models/userModel");


exports.home = (req, res) => {
    res.send("Hello Todo");
    res.send(User)

}

exports.getTodos = async (req, res)=>{
    try{
        const todos = await Todo.find({user:req.user.user_id});
        // const todos = await Todo.find();
        return res.status(200).json({
            success: true,
            message: "successfully retrieved",
            todos,
        })        
    }

    catch(err){
        return res.status(401).json({
            success: false,
            message: err.message,
        })
    }
}

exports.createTodo = async (req, res) => {
    try {
        const user = req.user;
        // return res.send(user)
        if(!user)
            throw new Error("user not found");

        const { title, tasks } = req.body;

        if (!title || !tasks) {
            throw new Error("Title and Tasks must be Required");
        }

        const todoExits = await Todo.findOne({ title });

        if (todoExits) {
            throw new Error("Title Already Exists");
        }
        // Creating & Inserting todo into the Database
        const todo = await Todo.create({
            title,
            tasks,
        });
        return res.status(201).json({
            success: true,
            message: "Todo Created Successfully",
            todo,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
};

exports.editTodo = async (req, res) => {
    try {
        await Todo.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({
            success: true,
            message: "Todo updated Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const todoId = req.params.id;
        const todo = await Todo.findByIdAndDelete(todoId);
        res.status(200).json({
            success: true,
            message: "Todo Deleted Successfully",
            todo,
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

exports.taskCompleted = async (req, res) => {
    const id = req.params.id;
    const todoId = id.split("_");

    const todo = req.body.todo;

    const updateTodo = await Todo.findOneAndUpdate({ _id: todoId }, { $set: { "todos.$.taskCompleted": true } });
    res.status(201).json({
        success: true,
        message: "Task completed"
    })
}

