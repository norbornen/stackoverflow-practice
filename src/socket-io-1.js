const io = require("socket.io-client");

const socket = io("wss://echo.websocket.org", {
  reconnectionDelayMax: 10000
});
socket.on('connect', () => {
  console.log(socket.connected); // true
});
socket.on("ping", function(data) {
  console.log("received ping");
});
socket.on("pong", function(data) {
  console.log("received pong");
});
socket.on('update', () => console.log('rr'));
socket.on('connect_error', () => console.log('rr'));
socket.on('connect_failed', () => console.log('rr'));
socket.on('disconnect', () => console.log('rr'));
socket.on('reconnect_attempt', () => console.log('rr'));
// socket.conn.on('packet', function (packet) {
//   if (packet.type === 'ping') console.log('received ping');
// });
// socket.conn.on('packetCreate', function (packet) {
//   if (packet.type === 'pong') console.log('sending pong');
// });
socket.open();
console.log(socket);

// var socket = require('socket.io-client')(
//   'wss://echo.websocket.org',
//   {
//     // path: '/io',
//     secure: true
//   }
// );
// socket.on('connect', () => {
//   console.log('connected');
// });
// socket.on('event', (data) => {
//   console.log('ev', data);
// });
// socket.on('disconnect', () => {
//   console.log('connected');
// });
// socket.on('error', (err) => {
//   console.log('error', err);
// });

// socket.on('update', data => console.log(data));
// socket.on('connect_error', err => handleErrors(err));
// socket.on('connect_failed', err => handleErrors(err));
// socket.on('disconnect', err => handleErrors(err));
// socket.on('reconnect_attempt', () => console.log('rr'));

// socket.connect();
// socket.send('aa');

// function handleErrors(...args) {
//   console.warn('something wrong...');
//   for (const err of args) {
//     console.warn(err);
//   }
// }
