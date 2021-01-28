// @ts-check
const puppeteer = require('puppeteer');

(async () => {

  const browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true,
    args: [
      '--disable-setuid-sandbox',
      '--no-sandbox',
      '--disable-web-security'
    ]
  });

  const page = await browser.newPage();

  await page.setRequestInterception(true);

  page.on('request', (request) => {
    if (request.url().includes('cs.pikabu.ru')) {
      const url = new URL(request.url());
      url.protocol = 'http';
      url.host = '5.187.0.220';

      request.continue({
        url: url.toString(),
        headers: {
          referer: 'cs.pikabu.ru',
        }
      });
    } else {
      request.continue();
    }
  });


  await page.goto('https://pikabu.ru', {
    timeout: 0,
    waitUntil: ['networkidle0', 'load']
  });

})();
