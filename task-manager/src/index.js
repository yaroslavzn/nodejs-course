const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.post("/users", (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(result => res.status(201).send(result))
    .catch(err => res.status(400).send(err));
});

app.post("/tasks", (req, res) => {
  const task = new Task(req.body);

  task
    .save()
    .then(result => res.status(201).send(result))
    .catch(err => res.status(400).send(err));
});

app.get("/users", (req, res) => {
  User.find({})
    .then(result => res.send(result))
    .catch(e => res.status(500).send(e));
});

app.get("/users/:id", (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).send();
      }

      res.send(user);
    })
    .catch(e => res.status(500).send());
});

app.get("/tasks", (req, res) => {
  Task.find({})
    .then(tasks => {
      res.send(tasks);
    })
    .catch(e => res.status(500).send(e));
});

app.get("/tasks/:id", (req, res) => {
  Task.findById(req.params.id)
    .then(task => {
      if (!task) {
        return res.status(404).send();
      }

      res.send(task);
    })
    .catch(e => res.status(500).send(e));
});

app.listen(port, () => {
  console.log("Server is running on the port " + port);
});
