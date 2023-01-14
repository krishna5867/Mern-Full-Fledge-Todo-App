const Todo = require("../models/todoModel");
const User = require("../models/userModel");

exports.home = (req, res) => {
    res.send("Hello Todo");
}
//create todo
exports.createTodo = async (req, res) => {
        const { title, tasks } = req.body;
        if (!title || !tasks) {
            throw new Error("Title and Tasks must be Required");
        }

    try {
        const todoExits = await Todo.findOne({ title });

        if (todoExits) {
            throw new Error("Title Already Exists");
        }else{
        // Creating & Inserting todo into the Database
        const todo = await Todo.create({
            title,
            tasks,
        });
        res.status(200).json({
            success: true,
            message: "Todo Created Successfully",
            todo
        });
        // console.log(todo);
    }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

//getTodos
exports.getTodos = async (req, res) => {
    const search = req.query.search || "";
    const page = req.query.page || 1;
    const sort = req.query.sort || "";
    const limit = 8;
    const query = {
        title: { $regex: search, $options: "i" }
    };
    try {
        const skip = (page - 1) * limit;
        const todo = await Todo.find(query)
            .sort({"createdAt": sort})
            .limit(limit)
            .skip(skip)
        res.status(200).json({
            success: true,
            message: "successfull",
            todo
        })
    }
    catch (err) {
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



