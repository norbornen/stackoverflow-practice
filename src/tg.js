// @ts-check
process.env.NTBA_FIX_319 = 1;

const TelegramBot = require('node-telegram-bot-api');
const mysql = require('mysql2');

const telegramBotToken = 'token';

const mysqlConnectionOptions = {
    host: "localhost",
    user: "root",
    password: "pass",
    database: "Name"
};

(async () => {
    /** @type {import('mysql2/promise').Pool} */
    let connection;

    try {
        connection = await mysql.createPool(mysqlConnectionOptions).promise();
        await connection.getConnection();

        await launchTelegramBot(connection);
    } catch(err) {
        console.error(err);
        require("./mysql/createDB.js")("SSSS");
    }

})();

/**
 * @param {import('mysql2/promise').Pool} connection
 */
async function launchTelegramBot(connection) {

    const bot = new TelegramBot(telegramBotToken, { polling: true });

    bot.onText(/\/start/, async (value) => {
        try {
            let id = value.from.id;
        
            let [ user ] = await connection.query(`select id from usersettings where id = ?`, id);
            if (user) {
                console.log("user finded")
                await bot.sendMessage(id, "Finded")
            } else {
                let data = [ id, 10 ];
                const addedUser = await connection.query("insert into usersettings(id, hub) values(?, ?)", data);
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
        try {
            const data = value.contact;
            const userDTO = [data.first_name, "City", data.phone_number, "State"]
            const addedUser = await connection.execute("insert into user(name, location, number, role) values (?,?,?,?)", userDTO);
            console.log("User add in database", addedUser);
        } catch (err) {
            console.error(err);
        }

    });
}

