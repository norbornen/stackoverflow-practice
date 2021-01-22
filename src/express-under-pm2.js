// @ts-check

const express = require('express');
const app = express();
const rand = Math.random();

app.get('/', (req, res) => {
    console.log(`ololo ${rand}`);
    res.json({ok: rand});
});
app.listen(3002, 'localhost');
