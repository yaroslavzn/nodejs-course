const request = require("supertest");
const app = require("../src/app");

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
