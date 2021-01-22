// @ts-check
const mineflayer = require('mineflayer');

const delayValue = 20 * 1000;
let timer;
let count = 0;

/** @type {import('mineflayer').BotOptions} */
const bot_credentials = {
  host: 'play.minecraft.ru',
  port: 25570,
  username: 'Arkadii7318',
  version: '1.12.2'
};


async function doStuff() {
  if (count > 1) {
    await restartContainer();
    count = 0;
    return;
  }

  count++;
  try {
    await botHealthCheck();
    count--;
  } catch (err) {
    console.error('fail: ', err);
  }
}

async function botHealthCheck() {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => reject(new Error('TIMED_OUT')), 5 * 1000);

      const bot = mineflayer.createBot(bot_credentials);
      bot.once('login', () => {
        resolve();
        bot.quit();
      });
      bot.once('error', reject);
    } catch (err) {
      reject(err);
    }
  });
}

async function restartContainer() {
  console.log("Ребут: " + new Date().toLocaleString());
  return Promise.resolve();
}


timer = setInterval(doStuff, delayValue);
