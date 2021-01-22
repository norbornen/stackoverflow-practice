// @ts-check
const Iconv  = require('iconv').Iconv;
const text = ' Pawn';


console.log(
  new Iconv('UTF-8', 'latin1').convert(text).toString()
);
