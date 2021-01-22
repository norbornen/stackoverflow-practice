// @ts-check

var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = new http.Server(app);
var io = socketIO(server);

app.set('port', 80);
app.use('/static', express.static(__dirname + '/static'));

// Маршруты
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, 'index.html'));
});

// Запуск сервера
server.listen(80, function() {
    console.log('Запускаю сервер на порте 80');
});

// Обработчик веб-сокетов
io.on('connection', function(socket) {
});

setInterval(function() {
    io.sockets.emit('message', 'hi!');
}, 1000);
