const getNotes = require("./notes");
const chalk = require("chalk");

console.log(getNotes());
console.log(chalk.blue.inverse("Info string"));
