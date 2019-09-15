const getNotes = require("./notes");
const chalk = require("chalk");

const action = process.argv[2];

switch (action) {
  case "add":
    console.log("Add the note!");
    break;
  case "remove":
    console.log("Remove the note!");
    break;
}
