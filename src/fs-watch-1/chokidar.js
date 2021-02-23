// @ts-check
const chokidar = require('chokidar');

const watcher = chokidar.watch(process.cwd(), {
  persistent: true
});
watcher.on('ready', () => {
  watcher.on('add', (path) => console.log(`File ${path} has been added`))
    .on('unlink', (path) => console.log(`File ${path} has been removed`))
    .on('addDir', (path) => console.log(`Directory ${path} has been added`))
    .on('unlinkDir', (path) => console.log(`Directory ${path} has been removed`));
});
