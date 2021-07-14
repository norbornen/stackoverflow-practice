// @ts-check
const crypto = require('crypto');

const argv = [...process.argv];
const solt = argv.pop();
const password = argv.pop();
const login = argv.pop();

const passwordHash = crypto.createHash('md5').update(password).digest('hex');
const hash = crypto.createHash('sha1').update(`${passwordHash}${solt}`).digest('hex');
console.log(`${login}:${hash}:${solt}`);
