// @ts-check
const crypto = require('crypto');

const string = 'test_merchant;www.market.ua;DH783023;1415379863;1547.36;UAH;Процессор Intel Core i5-4670 3.4GHz;Память Kingston DDR3-1600 4096MB PC3-12800;1;1;1000;547.36';
const key = 'dhkq3vUi94{Z!5frxs(02ML';

const hash = crypto.createHmac('md5', key).update(string).digest('hex');
console.log(hash);


// const z1 = crypto.createHash('md5').update(`${string}${key}`).digest('hex');
// const z2 = crypto.createHash('md5', key).update(string).digest('hex');
// const z3 = crypto.createHmac('md5', key).update(string).digest('hex');


// // Результат HMAC_MD5 и значение параметра merchantSignature будет строка
// // 3f787303ac524389b4a76383f9508251


// console.log(z1);
// console.log(z2);
// console.log(z3);
// */
