// @ts-check
const puppeteer = require('puppeteer');

const URL_TEST = 'http://localhost:3000';

async function Login() {
    const BROWSER = await puppeteer.launch({headless: false, slowMo: 100});
    const PAGE = await BROWSER.newPage();
    await PAGE.goto(URL_TEST);
    const login = await page.$('#input-6');
    await login.type('test_user');
    const password = await page.$('#input-10');
    await password.type('password');
    const login_button = await page.$('.v-btn__content');
    await login_button.click();

}
Login();
