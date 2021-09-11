// @ts-check

const express = require('express');

const app = express();
app.use(express.json());

app.get('/', (request, response) => {
  response.sendFile(`${__dirname}/index.html`);
});

app.post('/api/test', (request, response) => {
  if (!request.body) return response.sendStatus(400);
  console.log('information was get');
  response.json('succes');
});

app.listen(3000);
