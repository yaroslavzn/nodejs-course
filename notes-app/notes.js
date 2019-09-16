const fs = require("fs");

const getNotes = () => {
  return "Your notes...";
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicatedNotes = notes.filter(note => note.title === title);

  if (duplicatedNotes.length === 0) {
    const note = {
      title: title,
      body: body
    };

    notes.push(note);

    saveNote(notes);

    console.log("New note added!");
  } else {
    console.log("This note title is already in use!");
  }
};

const saveNote = notes => {
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
  getNotes: getNotes,
  addNote: addNote
};
