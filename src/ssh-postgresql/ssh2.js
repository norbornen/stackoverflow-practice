/* eslint-disable indent */
// @ts-check
const dotenv = require('dotenv');
const fs = require('fs');
const os = require('os');
const pg = require('pg');
const ssh2 = require('ssh2');

dotenv.config();

const pgHost = 'localhost'; // remote hostname/ip
const pgPort = 5432;
const proxyPort = 9090;
let ready = false;

const tunnelConfig = {
  username: process.env.SSH_TUNNEL_SSH_USER,
  password: process.env.SSH_TUNNEL_SSH_PASSWORD,
  // privateKey: fs.readFileSync(`${os.homedir()}/.ssh/id_rsa`),
  host: process.env.SSH_TUNNEL_SSH_HOST,
  port: 22,
  dstPort: 5432,
  localPort: 63334,
  keepAlive: true,
  readyTimeout: 10000,
};

const proxy = require('net').createServer((sock) => {
  if (!ready) {
    return sock.destroy();
  }
  c.forwardOut(sock.remoteAddress, sock.remotePort, tunnelConfig.host, tunnelConfig.dstPort, (err, stream) => {
    if (err) {
      console.error(err);
      return sock.destroy();
    }
    sock.pipe(stream);
    stream.pipe(sock);
  });
});

proxy.listen(tunnelConfig.localPort, '127.0.0.1');
proxy.on('error', (err) => console.log('proxy :: error', err));

const c = new ssh2.Client();
c.connect({
  host: tunnelConfig.host,
  port: 22,
  username: tunnelConfig.username,
  privateKey: fs.readFileSync(`${os.homedir()}/.ssh/id_rsa`)
});
c.on('connect', () => console.log('Connection :: connect'));
c.on('error', (err) => console.log('Connection :: error', err));
c.on('ready', () => {
  ready = true;
  console.log('ready');

  const client = new pg.Client({
    database: process.env.SSH_TUNNEL_DBNAME,
    user: process.env.SSH_TUNNEL_DBUSER,
    password: process.env.SSH_TUNNEL_DBPASSWORD,
    port: tunnelConfig.localPort,
  });
  console.log('client');

  client.connect(async (err) => {
    console.log('connect', err);
    if (err) {
      return console.error(err);
    }
    const { rows } = await client.query('select now()');
    console.log(rows);
  });
});
