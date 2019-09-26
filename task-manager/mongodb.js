const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

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

    // db.collection("users").insertOne({
    //   name: "Yaroslav",
    //   age: 26
    // });
    db.collection("tasks").insertMany(
      [
        {
          description: "Go to the  work.",
          completed: false
        },
        {
          description: "Drink a cup of tea",
          completed: true
        },
        {
          description: "Wash the body",
          completed: true
        }
      ],
      (error, result) => {
        if (error) {
          return console.log("Unable to insert tasks!");
        }

        console.log(result.ops);
      }
    );
  }
);
