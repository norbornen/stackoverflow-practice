// @ts-check
const express = require('express');
const path = require('path');
const transport = require('./transport');
const transport2 = require('./transport2');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', async(req, res) => {
    // const rates = await transport.get('https://blockchain.info/ru/ticker');
    const rates = await transport2('https://blockchain.info/ru/ticker', 'b');
    res.render('index', {
        rates
    });
});

app.listen(3003, 'localhost');
