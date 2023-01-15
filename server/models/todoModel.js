const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title: String,
    tasks: String,
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],
    isCompleted: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date(),
    },
    updatedAt: {
        type: Date,
        default: Date(),
    },
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Todo", todoSchema);
