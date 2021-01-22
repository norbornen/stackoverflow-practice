// @ts-check
const { default: got } = require('got');
const { CookieJar } = require('tough-cookie');
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
  const cookieJar = new CookieJar();
	const setCookie = promisify(cookieJar.setCookie.bind(cookieJar));

  await setCookie(
    'wordpress_logged_in_c5b26572b38876ec065ad6a5f98894a1=Alex0711%7C1604756314%7C17d34d811fcb1ef6dd5e5e5e56d93286',
    'https://etfdb.com'
  );
  
  const client = got.extend({
    prefixUrl: 'https://etfdb.com/api',
    headers: {
    },
    cookieJar
  });
  try {
    // const z = await client.post('members/login', {
    //   json: {
    //     amember_login: credentials.login,
    //     amember_pass: credentials.password
    //   },
    //   responseType: 'json'
    // });
    // console.log(z);
    const { body: z } = await client.post('screener/', {
      json: {
        structure: ['ETF'],
        dividend_frequency: ['Monthly'],
        only: ['meta', 'data', 'count']
      },
      responseType: 'json'
    });
    console.log(z);
    console.log(JSON.stringify(z[0]));
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));
  }

}
