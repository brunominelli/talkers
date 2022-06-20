const fs = require('fs');

const readTalkerFile = (data) => JSON.parse(fs.readFileSync(data, 'utf8'));

module.exports = { readTalkerFile };