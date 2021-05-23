// @ts-check
/* global document */
const { setTimeout } = require('timers/promises');
const puppeteer = require('puppeteer');

const links = [
  'https://steamcommunity.com/inventory/76561198142264901/440/2?l=english&count=5000',
  'https://steamcommunity.com/inventory/76561198296942562/440/2?l=english&count=5000',
  'https://steamcommunity.com/inventory/76561198142264901/440/2?l=english&count=5000',
];

/** @type {puppeteer.Browser} */
let browser;

(async () => {
  browser = await puppeteer.launch({
    headless: true,
    ignoreHTTPSErrors: true
  });

  do {
    const matchesCount = await findMatches();
    console.log(`[${new Date().toISOString()}] ${matchesCount}`);
    await setTimeout(2000);
  } while (1);

  await browser.close();
})();

/**
 * @returns {Promise<number>}
 */
async function findMatches() {
  const items = await Promise.allSettled(
    links.map(loadData)
  );

  const matchesCount = items.reduce(
    (acc, x) => {
      if (x.status === 'rejected') {
        console.error(x.reason);
        return acc;
      }

      (x.value || []).forEach((item) => {
        if (isInterested(item)) {
          acc += 1;
        }
      });
      return acc;
    },
    0
  );
  return matchesCount;
}

/**
 * @param {Record<string, any>} item
 * @returns {boolean}
 */
function isInterested(item) {
  return item.market_name === 'The DethKapp'
    && item.descriptions.some(({ value }) => value === 'Paint Color: Muskelmannbraun');
}

/**
 * @param {string} link
 * @returns {Promise<Array<Record<string, any>>>}
 */
async function loadData(link) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });
  await page.goto(link, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('body');

  const pageData = await page.evaluate(async () => {
    const data = document.querySelector('pre').textContent;
    try {
      return JSON.parse(data)?.descriptions;
    } catch (err) { /* */ }
  });

  await page.close();

  return pageData;
}
