// @ts-check
process.env.NTBA_FIX_319 = 1;
const TelegramBot = require('node-telegram-bot-api');


const telegramBotToken = '647343504:AAGe50VtP1mC7p8_YoHH6tfPHA2GNi2suvc';


(async () => {


    try {
        launchTelegramBot();
    } catch(err) {
        console.error(err);
    }

})();


async function launchTelegramBot() {

    const bot = new TelegramBot(telegramBotToken, { polling: true });

    bot.onText(/\/start/, async (value) => {
        try {
            let id = value.from.id;
        
            let [ user ] = [ false ];
            if (user) {
                console.log("user finded")
                await bot.sendMessage(id, "Finded")
            } else {
                let data = [ id, 10 ];
                const addedUser = {data};
                console.log("Client Add", addedUser)

                await bot.sendMessage(id, 'text 1');
                await bot.sendMessage(id, 'text 2');
                await bot.sendMessage(id, 'TEXT', {
                    reply_markup: {
                        inline_keyboard: [[
                            { text: "Button 1", callback_data: "1" },
                            { text: "Button 2", callback_data: "4" }
                        ]]
                    }
                });
            }
        } catch (err) {
            console.error(err);
        }
    });
    
    bot.on("message", (value) => {
        let id = value.chat.id;
        console.log('MSG', value);
    })
    
    bot.on("callback_query", async (value) => {
        let id = value.message.chat.id;
        console.log(value)
        let text = ["bla bla bla"]
        switch (value.data) {
            case "1":
                bot.sendMessage(id, text[0], {
                    reply_markup: {
                        keyboard: [[
                            {
                                text: "Отправить контакты",
                                request_contact: true
                            },
                            {
                                text: "Ввести контакты"
                            }
                        ]],
                        resize_keyboard: true
                    }
                });
                break;
        }
    });
    
    bot.on("contact", async (value) => {
        console.log('cont', value);

    });
}

