// @ts-check
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const upload = multer({
  dest: path.join(__dirname, 'uploads')
});

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
  res.render('home', { test: 'test' });
});

app.post(
  '/send',
  upload.fields([{name: 'fileEmailTo'}, {name: 'fileMessageTo'}]),
  (req, res) => {
    console.log(req.body);
    console.log(req.body.emailFrom);
    res.status(204).json({});
  }
);

app.listen(5000, () => {
  console.log('Server has been started at port 5000...');
});
