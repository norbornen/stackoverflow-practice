/* eslint-disable default-case, prefer-destructuring */
// @ts-check
process.env.NTBA_FIX_319 = '1';
require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');


(async () => {
  try {
    launchTelegramBot();
  } catch (err) {
    console.error(err);
  }
})();

async function launchTelegramBot() {
  const bot = new TelegramBot(
    process.env.TELEGRAM_TOKEN,
    { polling: true }
  );

  bot.onText(/\/start/, async (value) => {
    try {
      const id = value.from.id;

      const [user] = [false];
      if (user) {
        console.log('user finded');
        await bot.sendMessage(id, 'Finded');
      } else {
        const data = [id, 10];
        const addedUser = { data };
        console.log('Client Add', addedUser);

        await bot.sendMessage(id, 'text 1');
        await bot.sendMessage(id, 'text 2');
        await bot.sendMessage(id, 'TEXT', {
          reply_markup: {
            inline_keyboard: [[
              { text: 'Button 1', callback_data: '1' },
              { text: 'Button 2', callback_data: '4' }
            ]]
          }
        });
      }
    } catch (err) {
      console.error(err);
    }
  });

  bot.on('message', (value) => {
    const id = value.chat.id;
    console.log('MSG', value);
  });

  bot.on('callback_query', async (value) => {
    const id = value.message.chat.id;
    console.log(value);
    const text = ['bla bla bla'];
    switch (value.data) {
      case '1':
        bot.sendMessage(id, text[0], {
          reply_markup: {
            keyboard: [[
              {
                text: 'Отправить контакты',
                request_contact: true
              },
              {
                text: 'Ввести контакты'
              }
            ]],
            resize_keyboard: true
          }
        });
        break;
    }
  });

  bot.on('contact', async (value) => {
    console.log('cont', value);
  });
}

