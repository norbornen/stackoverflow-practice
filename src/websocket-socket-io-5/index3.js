/* eslint-disable max-len, quote-props */
// @ts-check
const io = require('socket.io-client');

const socket = io.connect('wss://socket.tradeit.gg/socket.io/', {
  reconnectionDelayMax: 10000,
  extraHeaders: {
    'Cookie': '"_ym_uid=16220306821058457600; _ym_d=1622030682; _fbp=fb.1.1622030682527.1800853644; _clck=1wqg08d; __stripe_mid=2d2e9f4e-865e-4731-802e-1ddc109f9b93b765b4; intercom-id-a2xzru96=6812656c-f733-462a-bf7b-2941187795f7; emailPopupShowed=true; _ym_isad=2; __stripe_sid=914420f8-5091-47de-a19e-139b67beeb10fa5c32; intercom-session-a2xzru96=; amp_5f9993=OprgjyUtDfmsbjBwamqs1Q...1f7u9ekko.1f7ub3fa8.0.0.0; _uetsid=ea828cf0caec11ebaaf573efce66410b; _uetvid=8de6cfc0be1a11eb942b0d154d323dff; _clsk=13oq4pb|1623442181116|1|1|vmss-cus/collect"',
    'Origin': 'https://tradeit.gg',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
  },
  upgrade: true
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

socket.on('open', (x) => console.log(x))

socket.open();
socket.se
