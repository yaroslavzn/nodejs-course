const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicatedNotes = notes.filter(note => note.title === title);

  if (duplicatedNotes.length === 0) {
    const note = {
      title: title,
      body: body
    };

    notes.push(note);

    updateNotes(notes);

    console.log(chalk.bgGreen.white("New note added!"));
  } else {
    console.log(chalk.bgRed.white("This note title is already in use!"));
  }
};

const removeNote = title => {
  const notes = loadNotes();

  if (notes.length !== 0) {
    const noteIdx = notes.findIndex(note => note.title === title);

    if (noteIdx === -1) {
      console.log(
        chalk.bgRed.white(`Note with title "${title}" does not exist!`)
      );
    } else {
      const updatedNotes = notes.filter(note => note.title !== title);

      updateNotes(updatedNotes);

      console.log(
        chalk.bgGreen.white(`Your "${title}" note successfully removed!`)
      );
    }
  } else {
    console.log(chalk.bgBlue.white("You dont have any notes!"));
  }
};

const updateNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote
};
