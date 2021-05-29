// @ts-check
const iconv = require('iconv').Iconv;

const text = '«Булка»»»@€₽#$%^&*()';

const text2 = iconv('cp866', 'utf8').convert(text);

console.log(text2.toString());
