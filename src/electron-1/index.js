

// @ts-check
const os = require('os');
const { app, BrowserWindow, Menu, screen } = require('electron');

let mainWindow;
const winURL = `/Users/${os.userInfo().username}/tmp/q/stat/1.html`;
let childWindow;
const childWinURL = `/Users/${os.userInfo().username}/tmp/q/stat/2.html`;
console.log(winURL);
console.log(childWinURL);

async function createWindow() {
  const display = screen.getPrimaryDisplay();
  const area = display.workArea;

  mainWindow = new BrowserWindow({
    useContentSize: false,
    width: 200,
    height: 200,
    webPreferences: {
      webSecurity: false, // теперь можно ссылаться на локальные файлы file://
      nodeIntegration: true, // to access node feautures in "browser" code
      nodeIntegrationInWorker: true,
      // nodeIntegrationInSubFrames: true
    }
  });

  console.log('11', winURL);
  await mainWindow.loadFile(winURL);
  // loadURL(winURL)
  console.log(12);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

async function createChildWindow() {
  const display = screen.getPrimaryDisplay();
  const area = display.workArea;

  childWindow = new BrowserWindow({
    parent: mainWindow,
    skipTaskbar: false,
    autoHideMenuBar: true,
    useContentSize: false,
    width: 200,
    height: 200,
    webPreferences: {
      webSecurity: false, // теперь можно ссылаться на локальные файлы file://
      nodeIntegration: true, // to access node feautures in "browser" code
      nodeIntegrationInWorker: true
    }
  });

  await childWindow.loadFile(childWinURL);

  childWindow.on('closed', () => {
    childWindow = null;
  });
}

//  Menu.setApplicationMenu(null)

app.on('ready', async () => {
  try {
    await createWindow();
    console.log('1');
    await createChildWindow();
    console.log(2);
  } catch (err) {
    console.error(err);
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
