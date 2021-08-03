// @ts-check
const { app, dialog } = require('electron');

app.on('ready', async () => {
  try {
    const res = await dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections']
    });
    process.stdout.write(JSON.stringify(res?.filePaths || []));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
