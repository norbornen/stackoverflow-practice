// @ts-check
const path = require('path');
const fs = require('fs');
const express = require('express');
const { default: axios } = require('axios');

const app = express();

app.get('/api/v1/users', async (req, res) => {
  const filepath = path.join(__dirname, 'users.json');

  try {
    await fs.promises.access(filepath, fs.constants.R_OK);
    return res.sendFile(filepath);
  } catch (err) { /* */ }

  const { data } = await axios.get(
    'https://jsonplaceholder.typicode.com/users',
    { responseType: 'stream' }
  );

  // клиенту сразу отдаётся ответ сервиса
  data.pipe(res);

  // запись данных во временный файл и переименование после записи
  const tempfile = `${filepath}.${Math.random()}`;
  const stream = fs.createWriteStream(tempfile);
  stream.on('error', console.error);
  stream.on('finish', () => {
    try {
      fs.accessSync(filepath, fs.constants.R_OK);
    } catch (error) {
      fs.renameSync(tempfile, filepath);
    }
  });
  data.pipe(stream);
});

const EXPRESS_HOST = 'localhost';
const EXPRESS_PORT = 3000;
app.listen(EXPRESS_PORT, EXPRESS_HOST, () => console.log(`Server started on port http://${EXPRESS_HOST}:${EXPRESS_PORT}`));
