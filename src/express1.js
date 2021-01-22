// @ts-check

const express = require('express');
const app = express();

app.get('/users', (req, res) => {
    console.log(req.query);
    res.json({ok: true});
});
app.listen(3002, 'localhost');
