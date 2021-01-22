// @ts-check

const net = require('net');
const { r } = require('./req');

const client = new net.Socket({
    readableHighWaterMark: 100,
    writableHighWaterMark: 200,
    highWaterMark: 150
});
console.log(`writableLength=${client.writableLength}, bufferSize=${client.bufferSize}`);

client.connect(1337, '127.0.0.1', () => {
	console.log('Connected');
    client.write('Hello, server! Love, Client.');
    
    setTimeout(() => r((buf) => client.write(buf)), 1500);
});

client.on('data', (data) => {
    console.log('Received: ' + data);
    // if (/^[\[\{]/.test(data.toString())) {
    // }
	// client.destroy(); // kill client after server's response
});

client.on('close', () => {
	console.log('Connection closed');
});
