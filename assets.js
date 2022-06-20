const fs = require('fs');
const crypto = require('crypto');

const readTalkerFile = (data) => JSON.parse(fs.readFileSync(data, 'utf8'));
const setRandomLoginToken = () => crypto.randomBytes(8).toString('hex');

module.exports = { readTalkerFile, setRandomLoginToken };