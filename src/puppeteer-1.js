// @ts-check
const puppeteer = require('puppeteer');
const { promisify } = require('util');

const credentials = {
  login: 'alexyavorskiy2005-0711@mail.ru',
  password: 'alex07112005'
};

(async () => {
  try {
    await spy();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

async function spy() {
  const browser = await puppeteer.launch({
    headless: true
  });

  const page = await browser.newPage();
  await page.goto(
    'https://etfdb.com/members/login/',
    { waitUntil: 'networkidle2', timeout: 0 }
  );
  await page.click('#user_login');
  await page.keyboard.type(credentials.login);
  await page.click('#password');
  await page.keyboard.type(credentials.password);
  await page.click('#login-button');

  await promisify(setTimeout)(2000);

  // await page.goto(
  //   'https://etfdb.com/screener/#page=1&structure=ETF&dividend_frequency=Monthly',
  //   { timeout: 0 }
  // );

  const etfData = await page.evaluate(async () => {
    const sleep = (timeout = 500) => new Promise((r) => setTimeout(r, timeout));

    let resultData = [];

    const fetchBody = {
      structure: ['ETF'],
      dividend_frequency: ['Monthly'],
      only: ['meta', 'data', 'count']
    };

    const fetchOptions = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      },
    };

    for (let i = 1, curr = 1; i<= curr; i++) {
      try {
        fetchBody.page = i;
        const res = await fetch(
          'https://etfdb.com/api/screener/',
          { ...fetchOptions, body: JSON.stringify(fetchBody) }
        );

        const json = await res.json();
        
        if (json) {
          if (json.data && Array.isArray(json.data)) {
            resultData = resultData.concat(json.data);
          }
          if (json.meta && 'total_pages' in json.meta && +json.meta.total_pages > 0) {
            console.log(curr, +json.meta.total_pages);
            curr = +json.meta.total_pages;
          }
        }

        await sleep(); // на всякий случай, вдруг там ограничение по количеству запросов
      } catch (err) {
        console.error(err);
      }
    }

    return resultData;
  });

  await browser.close();

  const filteringOverallRating = ['A+', 'A', 'A-', 'B+'];
  const etfABData = etfData.filter(({ overall_rating }) => filteringOverallRating.includes(overall_rating));
  console.log(JSON.stringify(etfABData, null, 2));
  console.log(`total items = ${etfData.length}, filterd items = ${etfABData.length}`);

  return etfABData;
}
