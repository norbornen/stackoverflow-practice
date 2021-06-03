// @ts-check
const express = require('express');

const app = express();

app.get('/', async (req, res) => {
  res.send('index.page');
});

app.get('/data', async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ result: '1', path: Date.now() }));
});

app.listen(3003, 'localhost', () => console.log('server runing...'));
