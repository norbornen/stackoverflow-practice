// @ts-check

const https = require('https');
const fs = require('fs');
const path = require('path');

module.exports.r = (/** @type {(x: Buffer) => void} */ cb) => {
    const req = https.request('https://jsonplaceholder.typicode.com/photos', (res) => {
        res.setEncoding('utf8');
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
            let json = JSON.parse(body);
            json = [...json, ...json, ...json, ...json, ...json, ...json, ...json, ...json, ...json];
            console.log(json[0], json.length);
            const buf = Buffer.from(JSON.stringify(json));
            console.log('go->', Math.trunc(buf.length/1024) + 'kb');
            cb(buf);
        });
    });
    req.on('error', console.error);
    req.end();
};

const req = https.request('https://jsonplaceholder.typicode.com/photos', (res) => {
    res.setEncoding('utf8');
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
        let json = JSON.parse(body);
        json = [...json, ...json, ...json, ...json, ...json, ...json, ...json, ...json, ...json];

        const keys = Object.keys(json[0]);

        const ss = [
            fs.createWriteStream(path.join(__dirname, '../csv-stream/csv/5.csv')),
            fs.createWriteStream(path.join(__dirname, '../csv-stream/csv/6.csv')),
            fs.createWriteStream(path.join(__dirname, '../csv-stream/csv/7.csv')),
            fs.createWriteStream(path.join(__dirname, '../csv-stream/csv/8.csv'))
        ];
        ss.forEach((s) => s.write(`${keys.join(',')}\n`));
        for (const x of json) {
            const data = keys.map((k) => x[k]).join(',');
            ss.forEach((s) => s.write(`${data}\n`));
        }
        ss.forEach((s) => s.close());

 
    });
});
req.on('error', console.error);
req.end();
