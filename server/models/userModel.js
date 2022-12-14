const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Name is Required"],
    trim: true,
    maxlength: [25, "Name must be 25 Ch Long"],
  },
  email: {
    type: String,
    require: [true, "Email is Required"],
    unique: true,
  },
  password: {
    type: String,
  },
  todo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'todo',
    required: true,
}],
  token: {
    type: String,
  },
},
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("User", userSchema);
