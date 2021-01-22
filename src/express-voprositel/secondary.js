// @ts-check
const { default: fetch } = require('node-fetch');

const links = [
  'https://www.cbr-xml-daily.ru/daily_json.js',
  'https://blockchain.info/ru/ticker'
];

async function takeExchangeRatesByLinks() {
  console.log('takeExchangeRatesByLinks...');
  try {
    await Promise.all(
      links.map((l) => {
        return fetch(l).then(res => res.json()).then(toDB)
      })
    );
  } catch (err) {
    console.error(err);
  }
}

async function toDB(data) {
  console.log(data);
  console.log(3)
}

const s = 1000;
const m = s * 60;

console.log('interval');
setInterval(takeExchangeRatesByLinks, 15000);
