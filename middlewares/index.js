const fs = require('fs');
const crypto = require('crypto');

const talkerJSON = './talker.json';
const regexEmail = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
const regexDate = new RegExp(/^\d{2}\/\d{2}\/\d{4}$/);

const readTalkerFile = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));

const writeTalkerFile = (file, data) => fs.writeFileSync(file, data);

const setToken = () => crypto.randomBytes(8).toString('hex');

const getAllTalkers = (_request, response) => {
  const talkers = readTalkerFile(talkerJSON);

  if (talkers) return response.status(200).json(talkers);
  return response.status(200).json({ talkers: [] });
};

const getTalkerById = (request, response) => {
  const { id } = request.params;
  const talkers = readTalkerFile(talkerJSON);
  const talker = talkers.find((person) => person.id === Number(id));

  if (talker) return response.status(200).json(talker);
  return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
};

const validateLoginEmail = (email, response) => {
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

const validateName = (name, response) => {
  if (!name) {
    return response
      .status(400)
      .json({ message: 'O campo "name" é obrigatório' });
    }

  if (name.length < 3) {
    return response
      .status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
};

const validateAge = (age, response) => {
  if (!age) {
    return response
      .status(400)
      .json({ message: 'O campo "age" é obrigatório' });
  }

  if (Number(age) < 18) {
    return response
      .status(400)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
};

const validateTalkWatchedAt = (watchedAt, response) => {
  if (!watchedAt) {
    return response
      .status(400)
      .json({ message: 'O campo "watchedAt" é obrigatório' });
  }

  if (!regexDate.test(watchedAt)) {
    return response
      .status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
};

const validateTalkRate = (rate, response) => {
  if (Number(rate) < 1 || Number(rate) > 5) {
    return response
      .status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  if (!rate) {
    return response
      .status(400)
      .json({ message: 'O campo "rate" é obrigatório' });
  }
};

const validateToken = (request, response, next) => {
  const { authorization } = request.headers;
  if (!authorization) {
    return response
      .status(401)
      .json({ message: 'Token não encontrado' });
  }

  if (authorization.length !== 16) {
    return response
      .status(401)
      .json({ message: 'Token inválido' });
  }

  next();
};

const validateTalk = (talk, response) => {
  if (!talk) {
    return response
      .status(400)
      .json({ message: 'O campo "talk" é obrigatório' });
  }

  const { watchedAt, rate } = talk;
  validateTalkRate(rate, response);
  validateTalkWatchedAt(watchedAt, response);
};

const createTalker = (request, response) => {
  const { name, age, talk } = request.body;

  validateName(name, response);
  validateAge(age, response);
  validateTalk(talk, response);

  const talkers = readTalkerFile(talkerJSON);
  const id = talkers.length + 1;
  const talker = { name, age, id, talk };
  
  talkers.push(talker);
  writeTalkerFile(talkerJSON, JSON.stringify(talkers));

  return response.status(201).json(talker);
};

const updateTalker = (request, response) => {
  const { name, age, talk } = request.body;
  const { id } = request.params;

  validateName(name, response);
  validateAge(age, response);
  validateTalk(talk, response);

  const talkers = readTalkerFile(talkerJSON);
  const talker = talkers.find((person) => person.id === Number(id));
  talker.name = name;
  talker.age = age;
  talker.id = Number(id);
  talker.talk = talk;

  writeTalkerFile(talkerJSON, JSON.stringify(talkers));
  return response.status(200).json(talker);
};

const deleteTalker = (request, response) => {
  const { id } = request.params;
  const talkers = readTalkerFile(talkerJSON);
  const talker = talkers.filter((person) => person.id !== Number(id));
  writeTalkerFile(talkerJSON, JSON.stringify(talker));

  return response.status(204).end();
};

const searchTalker = (request, response) => {
  const { q } = request.query;
  console.log(q);
  const talkers = readTalkerFile(talkerJSON);
  const talker = talkers.filter((person) => person.name.includes(q));
  
  return response.status(200).json(talker);
};

module.exports = {
  readTalkerFile,
  getAllTalkers,
  getTalkerById,
  validateLogin,
  validateToken,
  createTalker,
  updateTalker,
  deleteTalker,
  searchTalker,
};