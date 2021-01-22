// @ts-check

const { Telegraf, Extra, Markup, Stage, session } = require('telegraf'),
bot                = new Telegraf('dddd'),
SceneGenerator     = require('./scenes'),
curScene           = new SceneGenerator,
SearchSchene       = curScene.GenSearchSchene,
InfoSchene         = curScene.GenInfoSchene,
BookTopSchene      = curScene.GenBookTopSchene;

const stage = new Stage([SearchSchene(), InfoSchene, BookTopSchene])

bot.use(session())
bot.use(stage.middleware())

bot.start((ctx) => ctx.reply('Привет ! Напиши /help чтобы получить больше информации'))
bot.help((ctx) => ctx.reply('Список моих команд:\n|1. /search - поиск книги|\n|2. /info - краткая информация о книге|\n|3. /bookTop - топ книг с различных сайтов|'))
bot.command('search', async (ctx) => {
    await ctx.scene.enter('search')
})
bot.launch()
