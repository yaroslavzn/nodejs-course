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
  argv => {
    notes.addNote(argv.title, argv.body);
  }
).argv;

// Remove note command
const removeNote = yargs.command(
  "remove",
  "Remove a note",
  {
    title: {
      type: "string",
      demandOption: true,
      describe: "Title of the note, which you want to delete"
    }
  },
  argv => {
    notes.removeNote(argv.title);
  }
).argv;

// List notes command
const listNotes = yargs.command("list", "List notes", {}, () => {
  notes.listNotes();
}).argv;

// Read a note
const readNote = yargs.command("read", "Read the  note", {}, argv => {
  console.log("Reading the note!");
}).argv;
