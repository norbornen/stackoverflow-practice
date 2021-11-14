// @ts-check
const path = require('path');
const {
  app,
  BrowserWindow,
  BrowserView,
  ipcMain,
  dialog,
} = require('electron');

function createNewView() {
  const win = new BrowserWindow({
    width: 1000,
    height: 1000,
  });

  const view = new BrowserView({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.setBrowserView(view);
  view.setBounds({
    x: 0,
    y: 0,
    width: 1000,
    height: 1000,
  });
  view.webContents.loadFile(
    path.join(__dirname, 'BrowserViewPages', 'UploadFilePage.html'),
  );

  view.webContents.openDevTools({
    mode: 'bottom'
  });
}

app.whenReady().then(createNewView);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createNewView();
  }
});

ipcMain.on('open-file-dialog', (event, args) => {
  console.log(args);
  const parentWindow = process.platform === 'darwin'
    ? null
    : BrowserWindow.getFocusedWindow();
  dialog.showOpenDialog(
    parentWindow,
    { properties: ['openFile', 'openDirectory'] },
  ).then(({ filePaths = [] }) => {
    console.log(filePaths);
    event.sender.send('selected-file', filePaths);
  }).catch(console.error);
});
