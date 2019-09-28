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

    db.collection("tasks")
      .updateMany({ completed: false }, { $set: { completed: true } })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  }
);
