const fs = require('fs');

const dataBuffer = fs.readFileSync('1-json.json');
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);

data.name = 'Yaroslav';
data.age = 26;

const updatedDataJSON = JSON.stringify(data);
fs.writeFileSync('1-json.json', updatedDataJSON);