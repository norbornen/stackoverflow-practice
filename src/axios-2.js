/* eslint-disable camelcase */
// @ts-check
const { default: axios } = require('axios');
const cheerio = require('cheerio');

newCorporations().then(console.log).catch(console.error);

async function newCorporations() {
  const { data } = await axios.get('https://seo-gmbh.eu/invest/daily.php');
  const items = (data || {}).new_corporations || [];

  for (const item of items) {
    console.log(`-- ${item.finanzen_net} --`);
    let mainData;

    try {
      mainData = await parseNewCorporations(item);
    } catch (err) {}

    if (!mainData) {
      try {
        mainData = await getAdditionPriceBilanzGuv(item);
      } catch (err) {}
    }

    console.log(mainData);
  }
}

async function parseNewCorporations(iter) {
  const { data: html } = await axios.get(`https://www.finanzen.net/aktien/${iter.finanzen_net}-aktie`);
  const $ = cheerio.load(html, { decodeEntities: false });

  let price = $('div.snapshot-headline div.col-sm-7 div.row.quotebox:first-child div.col-xs-5.col-sm-4.text-sm-right.text-nowrap').text();
  let currency = $('div.snapshot-headline div.col-sm-7 div.row.quotebox:first-child div.col-xs-5.col-sm-4.text-sm-right.text-nowrap span').text();
  price = price.replace(currency, '').replace(',', '.');
  return { price, currency };
}

async function getAdditionPriceBilanzGuv(iter) {
  const ax = axios.create();
  ax.interceptors.response.use(
    null,
    (err) => {
      if (err.response && err.response.status === 410) {
        return Promise.resolve(err.response);
      }
      return Promise.reject(err);
    }
  );
  const { data: html } = await ax.get(`https://www.finanzen.net/bilanz_guv/${iter.finanzen_net}`);
  const $ = cheerio.load(html, { decodeEntities: false });

  let price = $('div.snapshot-headline div.col-sm-7 div.row.quotebox:first-child div.col-xs-5.col-sm-4.text-sm-right.text-nowrap').text();
  let currency = $('div.snapshot-headline div.col-sm-7 div.row.quotebox:first-child div.col-xs-5.col-sm-4.text-sm-right.text-nowrap span').text();
  price = price.replace(currency, '').replace(',', '.');
  return { price, currency };
}
