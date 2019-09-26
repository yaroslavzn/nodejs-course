const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const database = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to the DB.");
    }

    const db = client.db(database);
    let count;

    db.collection("tasks")
      .find({ completed: false })
      .toArray((err, tasks) => {
        if (err) {
          return console.log("Unable to count documents.");
        }

        console.log(tasks);
      });

    db.collection("tasks").findOne(
      { _id: new ObjectID("5d8c4bf9a06549355d325b88") },
      (err, task) => {
        if (err) {
          return console.log("Unable to fetch task.");
        }

        console.log(task);
      }
    );
  }
);
