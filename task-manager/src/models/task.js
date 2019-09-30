const mongoose = require("mongoose");

const taskScheme = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const Task = new mongoose.model("Task", taskScheme);

module.exports = Task;
