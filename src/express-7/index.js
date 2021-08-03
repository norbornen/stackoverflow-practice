// @ts-check
const express = require('express');
const path = require('path');
const dataService = require('./data-service');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/public', express.static(path.join(__dirname, 'public')));


app.get('/', async (req, res) => {
  const cards = await dataService.getItems();
  res.render('index', { cards: cards || [] });
});


const port = process.env.PORT ? +process.env.PORT : 3000;
const host = 'localhost';
app.listen(port, host, () => {
  console.log(`start on port: ${port}`);
});
