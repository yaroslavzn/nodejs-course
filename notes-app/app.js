const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes");

yargs.version = "1.1.0";

// Add note command
const addNote = yargs.command(
  "add",
  "Add a new note",
  {
    title: {
      type: "string",
      demandOption: true,
      describe: "Note title"
    },
    body: {
      type: "string",
      demandOption: true,
      describe: "Note description"
    }
  },
  function(argv) {
    notes.addNote(argv.title, argv.body);
  }
).argv;

// Remove note command
const removeNote = yargs.command(
  "remove",
  "Remove a note",
  function(yargs) {},
  function(argv) {
    console.log("Removing the note!");
  }
).argv;

// List notes command
const listNotes = yargs.command(
  "list",
  "List notes",
  function(yargs) {},
  function(argv) {
    console.log("Lis notes!");
  }
).argv;

// Read a note
const readNote = yargs.command(
  "read",
  "Read the  note",
  function(yargs) {},
  function(argv) {
    console.log("Reading the note!");
  }
).argv;
