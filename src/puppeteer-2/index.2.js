// @ts-check
/** @decla */
const puppeteer = require('puppeteer');
const { setTimeout } = require('timers/promises');

(async () => {

  const browser = await puppeteer.launch({
    headless: true,
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
      console.log(`request url: ${request.url()}`);
    }
    request.continue();
  });
  page.on('response', (response) => {
    if (response.headers()['content-type']?.startsWith('image')) {
      console.log(`response images url: ${response.url()}`);
    }
  });

  await page.goto('https://pikabu.ru', {
    timeout: 0,
    waitUntil: ['networkidle0', 'load']
  });

  await page.close();

  await browser.close();

})();
