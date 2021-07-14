// @ts-check
const crypto = require('crypto');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/a', (req, res) => {
  res.send(
    crypto.randomBytes(300).toString('hex')
  );
});

app.get('/b', (req, res) => {
  res.send(
    crypto.randomBytes(2000).toString('hex')
  );
});

const PORT = 3001;
app.listen(PORT, () => console.log(`server has been startd on port ${PORT}`));
