// @ts-check
const express = require('express');
const { createTable } = require('./handler');

const app = express();

const PORT = 5000;
app.use(express.json());


app.post('/createtable', createTable);

const startApp = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startApp();
