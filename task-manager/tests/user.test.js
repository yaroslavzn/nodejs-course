const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const app = require("../src/app");
const User = require("../src/models/user");

const userOneID = new mongoose.Types.ObjectId();
const token = jwt.sign({ _id: userOneID }, process.env.JWT_SECRET);

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

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test("Should create a new user", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "Rick Mishchenko",
      email: "demo@test.com",
      password: "Hello123!"
    })
    .expect(201);
});

test("Should login existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password
    })
    .expect(200);
});

test("Should not login non existent user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "demo5@test.com",
      password: "password123456"
    })
    .expect(400);
});

test("Should read user profile", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not read profile for unauthenticated user", async () => {
  await request(app)
    .get("/users/me")
    .send()
    .expect(501);
});

test("Should delete account for user", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not delete account for unauthenticated user", async () => {
  await request(app)
    .delete("/users/me")
    .send()
    .expect(501);
});
