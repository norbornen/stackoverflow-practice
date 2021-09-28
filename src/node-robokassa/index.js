// @ts-check
const express = require('express');
const RobokassaHelper = require('node-robokassa/src/RobokassaHelper');

const robokassaHelper = new RobokassaHelper({
  merchantLogin: 'your-merchant-login',
  hashingAlgorithm: 'sha256',
  password1: 'your-first-password',
  password2: 'your-second-password',

  testMode: true,
  resultUrlRequestMethod: 'POST',
});

const outSum = 52.79;
const invDesc = 'Test Transaction';

const options = {
  invId: 14893,
  isTest: true,
  userData: {
    productId: '14893',
    username: 'Mikhail'
  }
};

const paymentUrl = robokassaHelper.generatePaymentUrl(outSum, invDesc, options);
console.log(paymentUrl);

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/success', (req, res) => {
  console.log(robokassaHelper.config);
  robokassaHelper.handleResultUrlRequest(req, res, (values, userData) => {
    res.send('userData');
  });
});
app.listen(3000);
