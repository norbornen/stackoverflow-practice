/* eslint-disable max-len */
/* eslint-disable quote-props */
// @ts-check
const WebSocket = require('ws');

const ws = new WebSocket(
  'wss://socket.tradeit.gg/socket.io/?transport=websocket&sid=e8UzXjENpEe7j198v4t6',
  null,
  {
    // perMessageDeflate: false,
    origin: 'https://tradeit.gg',
    headers: {
      // 'Connection': 'Upgrade',
      // 'Host': 'socket.tradeit.gg',
      // 'Origin': 'https://tradeit.gg',
      // 'Pragma': 'no-cache',
      // 'Sec-WebSocket-Extensions': 'permessage-deflate; client_max_window_bits',
      // 'Sec-WebSocket-Key': 'YY3hj8z9WQRPkmtg134jyA==',
      // 'Sec-WebSocket-Version': '13',
      // 'Upgrade': 'websocket',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
      // 'Cookie': '"_ym_uid=16220306821058457600; _ym_d=1622030682; _fbp=fb.1.1622030682527.1800853644; _clck=1wqg08d; __stripe_mid=2d2e9f4e-865e-4731-802e-1ddc109f9b93b765b4; intercom-id-a2xzru96=6812656c-f733-462a-bf7b-2941187795f7; emailPopupShowed=true; _ym_isad=2; __stripe_sid=914420f8-5091-47de-a19e-139b67beeb10fa5c32; intercom-session-a2xzru96=; amp_5f9993=OprgjyUtDfmsbjBwamqs1Q...1f7u9ekko.1f7ub3fa8.0.0.0; _uetsid=ea828cf0caec11ebaaf573efce66410b; _uetvid=8de6cfc0be1a11eb942b0d154d323dff; _clsk=13oq4pb|1623442181116|1|1|vmss-cus/collect"',
    }
  }
);

ws.on('open', () => {
  ws.send('2probe');
  console.log('open');
});
ws.on('close', (err) => console.log('close', err));
ws.on('error', (err) => console.log('error', err));
ws.on('upgrade', () => {
  console.log('upgrade');
  ws.send('2probe');
});
ws.on('ping', () => console.log('ping'));
ws.on('message', (data) => {
  const chank = data.toString().replace(/^\d+/, '');
  if (chank !== '') {
    console.log(JSON.parse(chank));
  }
});
