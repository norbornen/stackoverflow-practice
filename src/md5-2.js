// @ts-check
const crypto = require('crypto');

// const hash = crypto.createHmac('md5', key).update(string).digest('hex');
// crypto.createHash('sha1').update(`${account.password_token}${inSolt}`).digest('hex');

const password = 'test';
const password_hash = crypto.createHash('md5').update(password).digest('hex');
console.log(`password_hash=${password_hash}`); // 098f6bcd4621d373cade4e832627b4f6

const timestamp = '1585180800';

// console.log(crypto.createHmac('md5', timestamp).update(password_hash).digest('hex'));
// console.log(crypto.createHmac('md5', password_hash).update(timestamp).digest('hex'));

console.log(
    crypto.createHmac('sha1', Buffer.from(timestamp, 'utf-8')).update(password_hash).digest('hex')
);
console.log(
    crypto.createHmac('sha1', Buffer.from(password_hash, 'utf-8')).update(timestamp).digest('hex')
);
console.log(
    crypto.createHash('sha1', Buffer.from(timestamp, 'utf-8')).update(password_hash).digest('hex')
);
console.log(
    crypto.createHash('sha1', Buffer.from(password_hash, 'utf-8')).update(timestamp).digest('hex')
);

console.log(
    crypto.createHmac('sha1', '').update(password_hash+timestamp).digest('hex'),
    crypto.createHash('sha1').update(password_hash+timestamp).digest('hex'),
);
// sha1( md5(password) timestamp )
// c56353374b591ce1aa6ba7383e37e6d931c7fc45

