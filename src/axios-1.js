// @ts-check
const querystring = require('querystring');
const { default: axios } = require('axios');

var key = querystring.stringify({ 'api_key': 'your_key'});
axios({
  method:'POST',
  url: 'https://miratext.ru/api2/call/user/balance',
  responseType : 'json' ,
  headers: {
    'Content-type': 'application/x-www-form-urlencoded',
    'User-Agent': 'Request-Promise',
    'Content-Length': key.length ,
  },
  data: {
    api_key: 'your_key'
  }
})
.then(function(response) {
   console.log('RESPONSE', response.data);
   console.log('RESPONSE', response.status);
   console.log('RESPONSE', response.statusText);
   console.log('RESPONSE', response.headers);
   console.log('RESPONSE', response.config);
}).catch(function (error) {
   if (error.response) {
     console.log('ERROR1 ', error.response.data);
     console.log('ERROR2 ', error.response.status);
     console.log('ERROR3 ', error.response.headers);
   } else if (error.request) {
     console.log('ERROR4 ', error.request);
   } else {
     console.log('ERROR5 ', error.message);
   }
     console.log('ERROR6 ', error.config);
});
