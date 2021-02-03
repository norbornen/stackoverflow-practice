// @ts-check
const fileToArray = require('./myLib');

fileToArray({}).then((x) => console.log(x)).catch(console.error);
