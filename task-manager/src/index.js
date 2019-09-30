const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is running on the port " + port);
});

const jwt = require("jsonwebtoken");

const doSomething = async () => {
  const token = jwt.sign({ _id: "abc123" }, "task-manager-secret", {
    expiresIn: "1 day"
  });

  console.log(token);

  const verified = jwt.verify(token, "task-manager-secret");

  console.log(verified);
};

doSomething();
