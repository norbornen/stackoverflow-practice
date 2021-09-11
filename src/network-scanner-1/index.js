// @ts-check
const { getIPRange } = require('get-ip-range');
const net = require('net');

(async () => {
  const ipAddresses = getIPRange('192.168.0.1/24');
  const res = await Promise.allSettled(
    ipAddresses.map((ip) => new Promise((resolve, reject) => {
      try {
        const socket = net.connect(
          { port: 14050, host: ip, timeout: 5 * 1000 },
          () => {
            socket.write('ver');
            socket.once('data', (chunk) => {
              resolve(chunk.toString('utf-8').includes('FreeP2P v'));
              socket.destroy();
            });
          }
        );
        socket.on('error', (err) => reject(err));
        socket.on('timeout', () => {
          reject(new Error('TIMED_OUT'));
          socket.destroy();
        });
      } catch (err) {
        reject(err);
      }
    })),
  );

  const availableNodes = res.reduce(
    (acc, x, idx) => {
      if (x.status === 'fulfilled' && x.value === true) {
        acc.push(ipAddresses[idx]);
      }
      return acc;
    },
    [],
  );

  console.log('availableNodes', availableNodes);
})();
