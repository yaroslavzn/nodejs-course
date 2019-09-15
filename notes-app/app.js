const fs = require("fs");

// fs.writeFileSync("notes.txt", "Hi, my name is Yaroslav!");
fs.appendFileSync("notes.txt", "\nWhat is your name?");
