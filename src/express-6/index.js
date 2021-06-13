// @ts-check
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const Cors = require('cors');

// const indexRoute = require('./routes/index');

const APP = express();
// const URL = 'mongodb+srv://user:asdasdajknwjdk@cluster0.hfqis.mongodb.net/data?retryWrites=true&w=majority';
const URL = 'mongodb://localhost:27017/test?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false';
const PORT = process.env.PORT || 5000;

const store = new MongoStore({
  collection: 'sessions',
  uri: URL
});

APP.set('view engine', 'pug');
APP.set('views', path.join(__dirname, '../client/views'));

APP.use(express.static(path.join(__dirname, '../client/assets')));
APP.use(express.static(path.join(__dirname, '../client/styles')));
APP.use(express.static(path.join(__dirname, '../client/scripts')));
APP.use(express.json());
APP.use(express.urlencoded({ extended: true }));

APP.use(session({
  secret: 'secret-value-key',
  resave: false,
  saveUninitialized: false,
  store
}));

APP.use(Cors());

// APP.use('/', indexRoute);
APP.get('/', (req, res) => {
  console.log(req);
  res.json({ ok: 1 }).end();
});
// APP.get('*', (...args) => {
//   console.log(args);
// });

async function start() {
  try {
    await mongoose.connect(URL, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true
    });

    APP.listen(PORT, () => console.log(`server has been startd on port ${PORT}`));
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

start();
