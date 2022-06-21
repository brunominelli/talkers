const fs = require('fs');
const crypto = require('crypto');

const readTalkerFile = (data) => JSON.parse(fs.readFileSync(data, 'utf8'));

const setToken = () => crypto.randomBytes(8).toString('hex');

const getAllTalkers = (_request, response) => {
  const talkers = readTalkerFile('./talker.json');
  if (talkers) return response.status(200).json(talkers);
  return response.status(200).json({ talkers: [] });
};

const getTalkerById = (request, response) => {
  const { id } = request.params;
  const talkers = readTalkerFile('./talker.json');
  const talker = talkers.find((person) => person.id === Number(id));

  if (talker) return response.status(200).json(talker);
  return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
};

const validateLoginEmail = (email, response) => {
  const regexEmail = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);

  if (!email) {
    return response.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!regexEmail.test(email)) {
    return response.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
};

const validateLoginPassword = (password, response) => {
  const length = 6;
  
  if (!password) {
    return response.status(400).json({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < length) {
    return response.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
};

const validateLogin = (request, response) => {
  const { email, password } = request.body;
  const token = setToken();

  validateLoginEmail(email, response);
  validateLoginPassword(password, response);

  return response.status(200).json({ token });
};

module.exports = {
  readTalkerFile,
  getAllTalkers,
  getTalkerById,
  validateLogin,
};