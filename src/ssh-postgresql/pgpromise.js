/* eslint-disable indent */
// @ts-check
const fs = require('fs');
const os = require('os');
const dotenv = require('dotenv');
const tunnelSsh = require('tunnel-ssh');
const pgPromise = require('pg-promise');

dotenv.config();

(async () => {

  /** @type {import('net').Server} */
  let tunnel;
  try {
    tunnel = await createTunnel();
  } catch (err) {
    console.error(err);
    return;
  }

  try {
    const db = connectPg();
    const rows = await db.query('select now()');
    console.log(rows);
  } catch (err) {
    console.error(err);
  } finally {
    tunnel.close();
  }

})();


/**
 * @param {number} [localPort=63334]
 * @returns {Promise<import('net').Server>}
 */
async function createTunnel(localPort = 63334) {
  /** @type {import('tunnel-ssh').Config} */
  const tunnelConfig = {
    username: process.env.SSH_TUNNEL_SSH_USER,
    password: process.env.SSH_TUNNEL_SSH_PASSWORD,
    // privateKey: fs.readFileSync(`${os.homedir()}/.ssh/id_rsa`),
    host: process.env.SSH_TUNNEL_SSH_HOST,
    port: 22,
    dstPort: 5432,
    localPort,
    keepAlive: true,
    readyTimeout: 10000,
  };

  return new Promise((resolve, reject) => {

    tunnelSsh(tunnelConfig, (err, server) => {
      if (err) {
        return reject(err);
      }
      resolve(server);
    })
    .on('error', (err) => console.error('[tunnel-ssh] error:', err))
    .on('connection', () => console.log('[tunnel-ssh] connected'))
    .on('close', () => console.log('[tunnel-ssh] closed'));

  });
}

/**
 * @param {number} [localPort=63334]
 * @returns {import('pg-promise').IDatabase}
 */
function connectPg(localPort = 63334) {
  /** @type {import('pg').ConnectionConfig} */
  const connectionConfig = {
    database: process.env.SSH_TUNNEL_DBNAME,
    user: process.env.SSH_TUNNEL_DBUSER,
    password: process.env.SSH_TUNNEL_DBPASSWORD,
    port: localPort,
  };

  const pgp = pgPromise({
      error(error, e) {
          if (e.cn) {
              console.error('CN:', e.cn);
              console.error('EVENT:', error.message || error);
          }
      },
      query(e) {
          if (process.env.NODE_ENV === 'development') {
              console.log('QUERY:', e.query);
          }
      }
  });

  return pgp(connectionConfig);
}
