/* eslint-disable max-len, quote-props */
// @ts-check
const { io } = require('socket.io-client');

const socket = io('wss://socket.tradeit.gg/socket.io/?sid=Ja5vjDO33kN9BuDGv3xK', {
  reconnectionDelayMax: 10000,
  transports: ['websocket'],
  // secure: true,
  extraHeaders: {
  //   'Cookie': 'express.sid=s:-mcAHEsnhCqJJ9rsCBxCQpFURquWbbaE.flM+FPjDs/4MDuremyq8Y9QJIPHoul/8y0C62BhELTw; __ssid=e2f5d8b81c4d8b50eb11810999db063',
    'Sec-WebSocket-Extensions': 'permessage-deflate; client_max_window_bits',
    'Sec-WebSocket-Key': 'YY3hj8z9WQRPkmtg134jyA==',
    'Origin': 'https://tradeit.gg',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
  },
  // upgrade: true
});


socket.on('connect_error', (err) => console.log('connect_error', err));
socket.on('connect_failed', (err) => console.log('connect_failed', err));
socket.on('disconnect', (err) => console.log('disconnect', err));
socket.on('reconnect_error', (err) => console.log('reconnect_error', err));
socket.on('reconnect_attempt', () => console.log('reconnect_attempt'));

socket.on('connect', () => console.log('connect', socket.connected));
socket.on('update', () => console.log('update'));
socket.on('ping', (data) => console.log('received ping', data));
socket.on('pong', (data) => console.log('received pong', data));
socket.on('message', (data) => console.log('data', data));

socket.open();
