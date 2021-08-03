// @ts-check
const { spawn } = require('child_process');
const path = require('path');
const electronPath = require('electron');

(async () => {
  try {
    console.log('RESULT', await filesSelection());
  } catch (err) {
    console.error('FAIL', err.toString('utf-8'));
  }
})();

async function filesSelection() {
  return new Promise((resolve, reject) => {
    const child = spawn(
      `${electronPath}`,
      [path.join(__dirname, 'dialog.js')],
    );

    let out = '';
    child.stdout.on('data', (data) => out += data);
    child.stderr.on('data', reject);
    child.on('close', (code) => {
      try {
        if (code === 0) {
          return resolve(JSON.parse(out));
        }
        reject(new Error(`child process exited with code ${code}`));
      } catch (err) {
        reject(err);
      }
    });
  });
}
