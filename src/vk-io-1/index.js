// @ts-check
const { VK } = require('vk-io');
const { HearManager } = require('@vk-io/hear');

const vk = new VK({
  token: 'ff9ac4f39527d7c856198e454aa3b09a5fb1826fe8c3f9ec0c8ad955e7a1b57efee3b75ae4ff3445d7441'
});
const config = {};
const commands = [];
const developer = 582059218;
const accounts = [];
// setInterval(async () => { await saveAll(); }, 500);
const utils = {
  pick: (array) => array[utils.random(array.length - 1)],
  random: (x, y) => (y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x))
};
const keyboard = (object) => ({
  keyboard: JSON.stringify({
    one_time: false,
    buttons: object
  })
});
async function saveAccounts() {
  console.log(accounts);
  // require('fs').writeFileSync('./database/accounts.json', JSON.stringify(accounts, null, '\t'));
  return true;
}
async function saveAll() {
  console.log(accounts);
  // require('fs').writeFileSync('./database/accounts.json', JSON.stringify(accounts, null, '\t'));
  return true;
}
vk.updates.on('message', async (message) => {
  console.log(message);
  if (Number(message.senderId) <= 0) return;
  if (/\[club204049539\|(.*)\]/i.test(message.text)) message.text = message.text.replace(/\[club204049539\|(.*)\]/ig, '').trim();
  if (message.isChat) return;
  // let res = await vkc.api.getMyBalance();
  // console.log(Number(res))
  if (!accounts.find((x) => x.id === message.senderId)) {
    const [user_info] = await vk.api.users.get({ user_id: message.senderId });
    const date = new Date();
    accounts.push({
      id: message.senderId,
      uid: accounts.length,
      name: user_info.first_name
    });
    saveAccounts();
    return message.send('Вы зарегестрированны!', keyboard(
      [[{
        action: {
          type: 'text',
          payload: '{}',
          label: '👉 Удвоить Деньги 👈'
        },
        color: 'positive'
      }],
      [{
        action: {
          type: 'text',
          payload: '{}',
          label: '📒 Инфо 📒'
        },
        color: 'negative'
      }],
      [{
        action: {
          type: 'text',
          payload: '{}',
          label: 'Вывод'
        },
        color: 'negative'
      }]]
    ));
  }
});

const cmd = {
  hear: (p, f) => {
    commands.push([p, f]);
  }
};
cmd.hear(/^(?:👉 Удвоить Деньги 👈)$/i, async (message, bot) => {
  return bot('📥 Вам нужно будет перейти и оплатить любую по ссылке');
  return bot(`Незабуть указать айди: ${message.senderId} в коментарии`);
});


cmd.hear(/^(?:📒 Инфо 📒)$/i, async (message, bot) => bot('Инфо'));

cmd.hear(/^(?:Начать)$/i, async (message, bot) => bot('Вы зарегестрированны!'));

vk.updates.startPolling();
