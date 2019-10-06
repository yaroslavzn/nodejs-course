const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("./task");

const userScheme = new mongoose.Schema(
  {
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
      unique: true,
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
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ],
    avatar: {
      type: Buffer
    }
  },
  {
    timestamps: true
  }
);

userScheme.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner"
});

// Generate auth token
userScheme.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "taskmanagerapp");
  user.tokens = user.tokens.concat({ token });

  await user.save();

  return token;
};

userScheme.methods.toJSON = function() {
  const user = this;
  const userObj = user.toObject();

  delete userObj.password;
  delete userObj.tokens;
  delete userObj.avatar;

  return userObj;
};

// Find user for login
userScheme.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

// Hashing password before save it
userScheme.pre("save", async function(next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }

  next();
});

userScheme.pre("remove", async function(next) {
  const user = this;

  await Task.deleteMany({ owner: user._id });

  next();
});

const User = mongoose.model("User", userScheme);

module.exports = User;
