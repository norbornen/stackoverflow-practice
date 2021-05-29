/* eslint-disable max-len */
/* eslint-disable quote-props */
// @ts-check
const WebSocket = require('ws');

const ws = new WebSocket(
  'wss://socket.csgo500.com/socket.io/?EIO=3&transport=websocket', {
    perMessageDeflate: false,
    headers: {
      // 'Cookie': 'express.sid=s%3A-mcAHEsnhCqJJ9rsCBxCQpFURquWbbaE.flM%2BFPjDs%2F4MDuremyq8Y9QJIPHoul%2F8y0C62BhELTw; __ssid=e2f5d8b81c4d8b50eb11810999db063',
      'Cookie': 'express.sid=s:-mcAHEsnhCqJJ9rsCBxCQpFURquWbbaE.flM+FPjDs/4MDuremyq8Y9QJIPHoul/8y0C62BhELTw; __ssid=e2f5d8b81c4d8b50eb11810999db063',
      'Origin': 'https://csgo500.com',
      // 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
    }
  }
);

ws.on('open', () => console.log('open'));
ws.on('close', (err) => console.log('close', err));
ws.on('error', (err) => console.log('error', err));
ws.on('upgrade', () => console.log('upgrade'));
ws.on('ping', () => console.log('ping'));
ws.on('message', (data) => {
  const chank = data.toString().replace(/^\d+/, '');
  if (chank !== '') {
    console.log(JSON.parse(chank));
  }
});
