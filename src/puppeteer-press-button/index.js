// @ts-check
const puppeteer = require('puppeteer');

const URL_TEST = 'http://localhost:3000';

async function Login() {
  const BROWSER = await puppeteer.launch({ headless: false, slowMo: 100 });
  const page = await BROWSER.newPage();
  await page.goto(URL_TEST);
  const login = await page.$('#input-6');
  await login.type('test_user');
  const password = await page.$('#input-10');
  await password.type('password');
  const loginButton = await page.$('.v-btn__content');
  await loginButton.click();
}
Login();
