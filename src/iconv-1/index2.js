/* eslint-disable prefer-destructuring */
// @ts-check
const Iconv = require('iconv').Iconv;

const textToDevice = Iconv('utf8', 'cp866');
const textFromDevice = Iconv('cp866', 'utf8');

const incomingText = 'водители пассажиры движение';

const asciiText = textToDevice.convert(incomingText);
const asciiBuffer = Buffer.from(asciiText);

const outcomingText = textFromDevice.convert(asciiBuffer).toString('utf8');

console.log(outcomingText);
