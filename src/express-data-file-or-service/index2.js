// @ts-check
const path = require('path');
const fs = require('fs');
const express = require('express');
const { default: axios } = require('axios');

const app = express();

app.get('/api/v1/users', (req, res) => {
  const filepath = path.join(__dirname, 'users.json');
  fs.promises.access(filepath, fs.constants.R_OK)
    .then(() => res.sendFile(filepath))
    .catch(() => axios.get(
      'https://jsonplaceholder.typicode.com/users',
      { responseType: 'stream' }
    ).then(({ data }) => {
      console.log('by_service');
      data.pipe(fs.createWriteStream(filepath));
      data.pipe(res);
    }))
    .catch((err) => {
      console.error('c', err);
      res.sendStatus(500);
    });
});

const EXPRESS_HOST = 'localhost';
const EXPRESS_PORT = 3000;
app.listen(EXPRESS_PORT, EXPRESS_HOST, () => console.log(`Server started on port http://${EXPRESS_HOST}:${EXPRESS_PORT}`));
