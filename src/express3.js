// @ts-check

const express = require('express');
const app = express();

app.get('/search', (req, res) => {
    const { text } = req.query;
    console.log(`[search] ${text}`);
    res.json({ok: true});
});

app.get('/search/:title', (req, res) => {
    const { title } = req.params;
    console.log(`[search] ${title}`);
    res.json({ok: true});
});

app.listen(3003, 'localhost');
