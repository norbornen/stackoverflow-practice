// @ts-check

const Scene = require("telegraf/scenes/base")

class SceneGenerator {
    GenSearchSchene(){
        const search = new Scene('search')
        search.enter(async (ctx) =>{
            await ctx.reply('Для поиска введите название книги')
        })
        search.on('text', async (ctx) =>{
            const name = ctx.message.text
            //проверяем наличие текста
            if(name){
                await ctx.reply('Идёт обработка . Это может занять некоторое время...')
                await ctx.scene.leave();
            }else{
                await ctx.reply("Мне непонятно данное имя")
                await ctx.scene.reenter()
            }
        })
        search.on('message', (ctx) =>{
            ctx.reply('Ты меня за дибила считаешь ?')
        })
        return search;

    }
    GenInfoSchene(){
        const info = new Scene('info')
        info.enter(async (ctx) =>{
            await ctx.reply('Для поиска информации введите название книги')
        })
        info.on('text', async (ctx) =>{
            const name = ctx.message.text
            //проверяем наличие текста
            if(name){
                await ctx.reply('Идёт обработка . Это может занять некоторое время...')
                ctx.scene.leave()
            }else{
                await ctx.reply("Мне непонятно данное имя")
                await ctx.scene.reenter()
            }
        })
        info.on('message', (ctx) =>{
            ctx.reply('Ты меня за дибила считаешь ?')
        })
        return info
    }
    GenBookTopSchene(){
        const bookTop = new Scene('bookTop')
        bookTop.enter(async (ctx) =>{
            await ctx.reply('Введите колличество книг которое хотите получить')
        })
        bookTop.on('text', async (ctx) =>{
            const currAge = Number(ctx.message.text)
            if(currAge && currAge > 0){
                await ctx.reply('Идёт обработка . Это может занять некоторое время...')
                await ctx.scene.leave()
            }else{
                await ctx.reply("Вы ввели не число или число равное/меньше нуля")
                await ctx.scene.reenter()
            }

        })
        bookTop.on('message', (ctx) =>{
            ctx.reply('Ты меня за дибила считаешь ?')
        })
        return bookTop
    }
}
module.exports = SceneGenerator
