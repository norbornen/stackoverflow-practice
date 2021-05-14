// @ts-check
const path = require('path');
const fs = require('fs');
const http = require('http');
const WebSocket = require('ws');

const port = +(process.env.PORT || 9030);

const server = http.createServer((req, res) => {
  console.log(req.headers);
  res.writeHead(200, { 'Content-Type': 'text/html' });
  const stream = fs.createReadStream(path.join(__dirname, '/index.html'));
  stream.pipe(res);
});

server.listen(port, () => 'Server up');


const wss = new WebSocket.Server({
  noServer: true,
  verifyClient(info, done) {
    console.log('verifyClient', info);
    done(true);
  },
});

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

wss.on('connection', (ws, req) => {
  setInterval(() => ws.send(Date.now()), 1000);
});
