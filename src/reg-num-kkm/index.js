// @ts-check
const crc = require('crc');

const KKM_USER_INN = '770123456789';
const KKM_SERIAL_NUMBER = '00000000000123456789';
const KKM_ORDER_NUMBER = '1';

const input = [
  `${KKM_ORDER_NUMBER}`.padStart(10, '0'), // дополняется лидирующими нулями до длины в 10 символов
  `${KKM_USER_INN}`.padStart(12, '0'), // дополняется лидирующими нулями до длины в 12 символов
  `${KKM_SERIAL_NUMBER}`.padStart(20, '0'), // дополняется лидирующими нулями до длины в 20 символов
].join('');

const checksum = crc.crc16ccitt(input);

const output = [
  `${KKM_ORDER_NUMBER}`.padStart(10, '0'),
  `${checksum}`.padStart(6, '0'),
].join('');

console.log(`input=${input}`);
console.log(`checksum=${checksum}`);
console.log(`result=${output}`);

