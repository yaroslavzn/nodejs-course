const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number!");
      }
    }
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid!");
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    validate(value) {
      if (value.includes("password")) {
        throw new Error("Password should not contains a 'password' word!");
      }
    }
  }
});

const user = new User({
  name: "    Yaroslav   ",
  age: 26,
  email: "YAROSLAVZN@GMAIL.COM",
  password: "12345678"
});

user
  .save()
  .then(result => console.log(result))
  .catch(err => console.log(err));

const Task = new mongoose.model("Task", {
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

// const task = new Task({
//   description: "Learn REST API creation",
//   completed: false
// });

// task
//   .save()
//   .then(result => console.log(result))
//   .catch(err => console.log(err));
