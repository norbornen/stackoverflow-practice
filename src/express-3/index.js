// @ts-check
const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/public', express.static(path.join(__dirname, 'public')));


app.get('/users/:user_name?', (req, res) => {
  res.render('users', { user_name: req.params.user_name || '[no name]' });
});


const port = process.env.PORT ? +process.env.PORT : 3000;
const host = 'localhost';
app.listen(port, host, () => {
  console.log(`start on port: ${port}`);
});
