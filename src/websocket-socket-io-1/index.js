// @ts-check

const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const app = express();
const server = new http.Server(app);
const io = socketIO(server);

app.set('port', 80);
app.use('/static', express.static(`${__dirname}/static`));

// Маршруты
app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'index.html'));
});

// Запуск сервера
server.listen(80, () => {
  console.log('Запускаю сервер на порте 80');
});

// Обработчик веб-сокетов
io.on('connection', (socket) => {
});

setInterval(() => {
  io.sockets.emit('message', 'hi!');
}, 1000);
