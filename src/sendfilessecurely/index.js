/* eslint-disable prefer-destructuring */
// @ts-check
const puppeteer = require('puppeteer');
const path = require('path');
const chokidar = require('chokidar');
const { Iconv } = require('iconv');
const contentDisposition = require('content-disposition');
const contentDispositionAttachment = require('content-disposition-attachment');

(async () => {
  const downloadPath = __dirname;

  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  await page.goto(
    'https://www.SendFilesSecurely.com/getfile.aspx?id=mV4Ud29sfVJJIkwMFWHPL4LwiPIHG5NQxegc',
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

    console.log(response.headers());
    console.log(hContentDisposition);

    try {
      const buf = Buffer.from(hContentDisposition, 'binary');
      const iconv = new Iconv('ISO-8859-1', 'UTF-8');
      // const iconv = new (require('iconv'))('UTF-8', 'b');
      console.log(iconv.convert(buf).toString('utf-8'));
    } catch (err) {
      console.error(err);
    }

    try {
      const iconv = new Iconv('UTF-8', 'ISO-8859-1');
      const x = iconv.convert(hContentDisposition);
      console.log('u-iso', x.toString('utf-8'));
    } catch (err) {
      console.error(err);
    }

    try {
      const iconv = new Iconv('ISO-8859-1', 'UTF-8');
      const x = iconv.convert(hContentDisposition);
      console.log('iso-u', x.toString('utf-8'));
    } catch (err) {
      console.error(err);
    }

    try {
      const x = contentDisposition.parse(hContentDisposition);
      console.log(1, hostname, x);
    } catch (err) {
      console.error(err);
    }
    try {
      const x = contentDispositionAttachment.parse(hContentDisposition);
      console.log(2, hostname, x);
    } catch (err) {
      console.error(err);
    }

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
