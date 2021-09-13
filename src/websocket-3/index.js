/* eslint-disable no-case-declarations */
/* eslint-disable no-undef */
// @ts-check
const { spawn } = require('child_process');
const path = require('path');
const http = require('http');
const express = require('express');
const WebSocket = require('ws');

const app = express();
app.set('view engine', 'ejs');

app.get('/', (_request, response) => {
  response.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const server = http.createServer(app);
const webSocketServer = new WebSocket.Server({
  server
});

const dispatchEvent = (
  /** @type {WebSocket.Data} */ message,
  /** @type {WebSocket} */ ws
) => {
  /** @type {{ cmd: string; payload: Record<string, any>; }} */
  const { cmd, payload } = JSON.parse(message);
  if (cmd) {
    let args = [];
    switch (cmd) {
      case 'find':
        args = ['.', '-name', payload.name];
        break;
      case 'tail':
        args = ['-f', payload.name];
        break;
      default:
    }
    const workerProcess = spawn(cmd, args);
    workerProcess.stdout.on('data', (data) => ws.send(data.toString('utf-8')));
    workerProcess.stderr.on('data', (data) => ws.send(data.toString('utf-8')));
  }
};

webSocketServer.on('connection', (ws) => {
  ws.on('error', (e) => {
    console.error(e);
    ws.send(e);
  });
  ws.on('message', (m) => dispatchEvent(m, ws));
});

const port = +(process.env.PORT || 3000);
server.listen(
  port,
  () => console.log('Server started'),
);




// const server = http.createServer((req, res) => {
//   console.log(req.headers);
//   res.writeHead(200, { 'Content-Type': 'text/html' });
//   const stream = fs.createReadStream(path.join(__dirname, '/index.html'));
//   stream.pipe(res);
// });

// server.listen(port, () => 'Server up');


// const wss = new WebSocket.Server({
//   noServer: true,
//   verifyClient(info, done) {
//     console.log('verifyClient', info);
//     done(true);
//   },
// });

// server.on('upgrade', (request, socket, head) => {
//   wss.handleUpgrade(request, socket, head, (ws) => {
//     wss.emit('connection', ws, request);
//   });
// });

// wss.on('connection', (ws, req) => {
//   setInterval(() => ws.send(Date.now()), 1000);
// });
