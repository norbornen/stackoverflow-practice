// @ts-check
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.options('*', cors());
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', async (req, res) => {
  res.render('index');
});

app.post('/api/sum', (req, res) => {
  const values = Object.values(req.body || {});
  const sum = values.reduce((acc, val) => acc + val, 0);
  res.json({ data: sum });
});

const PORT = 3000;
const HOST = 'localhost';
app.listen(PORT, HOST, () => console.log('Server starting...'));
