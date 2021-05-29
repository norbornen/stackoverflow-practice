// @ts-check
const Gamedig = require('gamedig');

Gamedig.query({
  type: 'etqw',
  host: '178.162.135.83',
  port: 27735
}).then((info) => {
  console.log(JSON.stringify(info, null, 2));
}).catch((error) => {
  console.log('Server is offline', error);
});
