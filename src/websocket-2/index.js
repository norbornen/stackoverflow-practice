/* eslint-disable max-len */
// @ts-check
const WebSocket = require('ws');

const ws = new WebSocket(
  'wss://api.talkytimes.com/push/457/thpqtmdj/websocket',
  // {
  //   perMessageDeflate: false,
  //   headers: {
  //     // 'Cookie': 'express.sid=s%3A-mcAHEsnhCqJJ9rsCBxCQpFURquWbbaE.flM%2BFPjDs%2F4MDuremyq8Y9QJIPHoul%2F8y0C62BhELTw; __ssid=e2f5d8b81c4d8b50eb11810999db063',
  //     // 'Cookie': 'express.sid=s:-mcAHEsnhCqJJ9rsCBxCQpFURquWbbaE.flM+FPjDs/4MDuremyq8Y9QJIPHoul/8y0C62BhELTw; __ssid=e2f5d8b81c4d8b50eb11810999db063',
  //     Origin: 'https://talkytimes.com',
  //     'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
  //   },
  // }
);

ws.onopen = () => {
  const registerRequest = JSON.stringify({
    method: 'register',
    params: {
      key: '9b104a8d364d2f86ebe51721b78ac493'
    }
  });
  const data = JSON.stringify([registerRequest]);
  ws.send(data);
};
ws.onmessage = (ev) => console.log(ev.data);
ws.onclose = (ev) => console.log(`Connection close by code ${ev.code}`, ev);
ws.onerror = (ev) => console.log('Connection error by', ev);
