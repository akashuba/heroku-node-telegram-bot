const token = process.env.TOKEN;

const Bot = require('node-telegram-bot-api');
const passwordGenerator = require('./passwordGenerator').passwordGenerator;
let bot;

if (process.env.NODE_ENV === 'production') {
    bot = new Bot(token);
    bot.setWebHook(process.env.HEROKU_URL + bot.token);
} else {
    bot = new Bot(token, { polling: true });
}

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');

bot.on('message', msg => {
    const name = msg.from.first_name;
    if (msg.text === 'password') {
        bot.sendMessage(msg.chat.id, passwordGenerator.getPassword(8));
    } else {
        bot.sendMessage(msg.chat.id, 'Hello, ' + name + '!').then(() => {
            // reply sent!
        });
    }
});

module.exports = bot;
