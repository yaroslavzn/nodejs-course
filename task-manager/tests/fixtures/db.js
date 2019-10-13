const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../src/models/user");

const userOneID = new mongoose.Types.ObjectId();
const token = jwt.sign({_id: userOneID}, process.env.JWT_SECRET);

const userOne = {
    _id: userOneID,
    name: "Test User",
    email: "demo1@test.com",
    password: "demopass123",
    tokens: [
        {
            token: token
        }
    ]
};

const setupDatabase = async () => {
    await User.deleteMany();
    await new User(userOne);
};

module.exports = {
    userOneID, userOne, setupDatabase
};