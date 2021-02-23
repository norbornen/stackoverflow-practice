// @ts-check
const fs = require('fs');

const w = fs.watch(
  process.cwd(),
  { recursive: true },
  (eventType, filename) => {
    console.log('listener', eventType, filename);
  }
);

w.on('change', (eventType, filename) => {
  console.log('[h] change', eventType, filename);
});
w.on('error', (err) => console.error('[h] error', err));
w.on('close', () => console.log('[h] close'));
