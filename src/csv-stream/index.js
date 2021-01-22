// @ts-check

const fs = require('fs');
const path = require('path');

const s1 = fs.createWriteStream('./res.csv', { start: 0 });
const s2 = fs.createWriteStream('./res.csv', { start: 6 });


process.nextTick(() => {
    s2.write('22');
    s2.close();
});
process.nextTick(() => {
    s1.write('11');
    s1.close();
});
