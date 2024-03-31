//
// Main Lib
//

const Discord = require('discord.js');
const logger = require('./logger');
var auth = require('./auth.json');
var wiki = require('wikijs').default;
const translate = require('@vitalets/google-translate-api');
const { roll } = require('./roll.js');
const { searchJishoWord } = require('./jisho.js');
const { getWeatherData } = require('./weather');
const { fxconvert } = require('./fxconvert.js');

// Initialize Discord Bot

const bot = new Discord.Client();

bot.once('ready', () => {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.user.username + ' - (' + bot.user.id + ')');
});

bot.on('message', async message => {
    // Our bot needs to know if it will execute a command

	if (message.author.bot) return;
	
    // It will listen for messages that will start with `!`
    if (message.content.substring(0, 1) == '!') {
        var args = message.content.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.slice(1);
        switch(cmd) {

            case 'ping':
                message.reply(`Pong!`);
			break;

			case 'info':
				message.reply(`This bot is made by Ainhart for his own purposes as his personal project.`);
			break;

			case 'roll':
				roll(args, message)
			break;

			case 'jisho':
				searchJishoWord(args, message);
			break;
			
			// !translate
			case 'translate':
				translate(args, {to: 'en'}).then(res => {
					console.log(res.text);
					console.log(res.from.language.iso);
						message.reply(`Translated text: *${res.text}*`);
					}).catch(err => {
						console.error(err);
					});
			break;
			
			// !weather
			case 'weather':
                getWeatherData(args.join(' '), message);
            break;
			
			// !fxconvert
			case 'fxconvert':
				fxconvert(args, message);
			break;
			
			//!wiki
			case 'wiki':
				var input = '';
				for (let i = 0; i < args.length; i++) {
					input += args[i];
				}
				wiki().page(input).then(page => {
					let wikiUrl = page.url();
					message.reply(`Article link: ${wikiUrl}`)
				})
				.catch(error => {
					message.reply(`No such page exists`);
				});
			break;
         }
     }
});


bot.login(auth.token);