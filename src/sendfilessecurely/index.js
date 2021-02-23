// @ts-check
const puppeteer = require('puppeteer');
const path = require('path');
const chokidar = require('chokidar');
const contentDisposition = require('content-disposition');

(async () => {
  const downloadPath = __dirname;

  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  await page.goto(
    'https://www.SendFilesSecurely.com/getfile.aspx?id=VBcvIgGdkctZei52MSunaZl58DjOUNNZNAVf',
    {
      waitUntil: 'domcontentloaded'
    }
  );

  await page._client.send(
    'Page.setDownloadBehavior',
    {
      behavior: 'allow', downloadPath
    },
  );

  page.on('response', (response) => {
    const url = new URL(response.request().url());
    const hostname = url.hostname;
    const hContentDisposition = response.headers()['content-disposition'];
    const hContentLength = parseInt(response.headers()['content-length'], 10);
    if (!hostname.includes('sendfilessecurely.com') || !hContentDisposition || Number.isNaN(hContentLength) || hContentLength === 0) {
      return;
    }

    console.log(hContentDisposition);
    const x = contentDisposition.parse(hContentDisposition);
    console.log(hostname, x);
    // let m = [];
    // if (m && m.length > 0 && hContentLength > 0) {
    //   const filename = m[1];
    //   const filepath = path.join(downloadPath, filename);

    //   const watcher = chokidar.watch(downloadPath, {
    //     persistent: true
    //   });
    //   watcher.on('change', (p) => {
    //     console.log(p === filepath, p, filepath);
    //     // if (p === filepath) {
    //     //   watcher.removeAllListeners();
    //     //   watcher.unwatch(downloadPath);
    //     //   await fs.promises.rename(filepath, path.join(downloadPath, `__example__.${filename}`));
    //     //   await browser.close();
    //     // }
    //   });
    // }
  });

  await page.type('#ContentPlaceHolder0_password', '12345');
  await page.click('#ContentPlaceHolder0_btnSubmit');

})();
