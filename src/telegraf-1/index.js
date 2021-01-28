// @ts-check
const { Telegraf } = require('telegraf');
const { URL } = require('url');

const bot = new Telegraf('...');

bot.command('dwnld', (ctx) => {
  bot.telegram.sendDocument(ctx.chat.id, 'https://drive.google.com/file/d/1EETTa6cruWH4i-pB6s-WnSuI4EZtEKY6/view?usp=sharing');
});

bot.launch();

const url = new URL('https://drive.google.com/file/d/1EETTa6cruWH4i-pB6s-WnSuI4EZtEKY6/view?usp=sharing');
const urlpath = url.pathname.split(/\//);
const id = urlpath[urlpath.length - 2];
console.log(id);

setTimeout(() => {

  // bot.telegram.sendDocument(..., 'https://doc-14-7c-docs.googleusercontent.com/docs/securesc/ha0ro937gcuc7l7deffksulhg5h7mbp1/dlvgjp8s09tfoa2ncqiadv5a1lh5mprq/1611863025000/03014927842211185042/*/1EETTa6cruWH4i-pB6s-WnSuI4EZtEKY6?e=download');
  // bot.telegram.sendDocument(..., 'https://docs.google.com/uc?export=download&id=1EETTa6cruWH4i-pB6s-WnSuI4EZtEKY6');

}, 2000);
