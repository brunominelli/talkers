const express = require('express');
const bodyParser = require('body-parser');
const { readTalkerFile, setRandomLoginToken } = require('./assets');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_request, response) => {
  const talkers = readTalkerFile('./talker.json');
  if (talkers) return response.status(200).json(talkers);
  return response.status(200).json({ talkers: [] });
});

app.get('/talker/:id', (request, response) => {
  const { id } = request.params;
  const talkers = readTalkerFile('./talker.json');
  const talker = talkers.find((person) => person.id === Number(id));
  if (talker) return response.status(200).json(talker);
  return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', (request, response) => {
  const token = setRandomLoginToken();
  return response.status(200).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
