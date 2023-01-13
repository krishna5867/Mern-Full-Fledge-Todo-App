const Todo = require("../models/todoModel");
const User = require("../models/userModel");

exports.home = (req, res) => {
    res.send("Hello Todo");
}
//create todo
exports.createTodo = async (req, res) => {
    try {
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
            tasks
        });

        res.status(200).json({
            success: true,
            message: "Todo Created Successfully",
            todo,
            User,
        });

    } catch (error) {
        // console.log(error);
        res.status(400).send(error.message);
    }
};

//getTodos
exports.getTodos = async (req, res) => {
    try {
        const search = req.query.search || "";

        const query = {
            title: { $regex: search, $options: "i" }
    };

        const todo = await Todo.find(query)
        return res.status(200).json({
            success: true,
            message: "successfull",
            todo
        })
    }
    catch (err) {
        // console.log(err.message);
        return res.status(401).json({
            success: false,
            message: err.message,
        })
    }
}

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

exports.isCompleted = async (req, res) => {
    try {
        const todoId = req.params.id;
        const todo = await Todo.findOneAndUpdate(
            {
                todoId,
},
            [
                {
                    $set: {
                        isCompleted: {
                            $eq: [false, "$isCompleted"],
                        },
                    },
                },
            ],
        )
        res.status(200).json({
            message: "Todo updated",
            todo,
        })
    } catch (error) {
        console.log(error.message);
    }
}

// exports.searchTodo = async (req, res) => {
// // try {
// //     const search = req.query.search;
// //     const todo = await Todo.find();
// //     const filterTodo = todo.filter((item)=>{
// //         return item.title.toLowerCase().includes(search.toLowerCase())});
// //     res.status(200).json({
// //         filterTodo,
// //     })
// // } catch (error) {
// //     console.log(error.message);
// // }
// };



