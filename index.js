const Discord = require('discord.js');
const client = new Discord.Client();

const http = require('axios');
const color = require('chalk');
const config = require('./config.json');

// Sets the bot's status once the 'ready' state has been emitted.
client.on('ready', () => {
    client.user.setStatus('online');
    console.log('[GGBot]' + color.green('[Ready]') + ' Connection to Discord Established');
});

client.on('message', async message => {
    // Ignore messages from other bots.
    if (message.author.bot) return;

    // Ignore messages that don't start with our prefix.
    if (message.content.indexOf(config.prefix) !== 0) return;

    // Split received message into individual words and remove prefix.
    const args = message.content.slice(config.prefix.length).trim().split(' ');

    let user = message.member;
    let errors = 0;

    // Basically an if-statement, but faster
    switch (args[0].toLowerCase()) {
        /**
         * Sends a private message to the user which contains all available bot commands.
         */
        case 'help':
            user.send('ENTER COMMANDS HERE');
            message.delete(1000);
            break;

        /**
         * Checks the forums to see if user has the 'Donator' rank.
         * If so, they are given the same rank in the Discord.
         */
        case 'donator':
            http.get('url').then(res => {
                if (res.data === 'true') {
                    let role = message.guild.roles.find('name', 'Donator');
                    console.log('[GGBot]' + color.yellow('[Donations]') + `${user} has been promoted to the Donator role.`);
                    user.addRole(role).then(message.reply('has received their donator role. Thanks for donating!')).catch(err => {
                        error++;
                        console.log('[GGBot]' + color.red('[Error] ') + err);
                    });
                }
                //message.channel.send(res.data);
            }).catch(err => {
                errors++;
                console.log('[GGBot]' + color.red('[Error] ') + err);
                message.reply('We\'re sorry, it seems as though we received an error when trying to receive your information. Please send a message to Noah, Chris, Nighmare, or Nevexo.');
            });

            message.delete(1000);
            break;
        
        /**
         * Sends a private message to the user which contains bot information.
         */
        case 'status':
            if (user.roles.some(r=>["Engineer", "Founder"].includes(r.name))) {
                user.send(`Total errors since last start: ${errors}`);
            } else {
                message.reply(' You do not have permission to access this command!');
            }

            message.delete(1000);
            break;
        
        case 'song':
            break;
        
        case '':
            break;

        default:
            break;
    }
});

// Login client with discord token.
client.login(config.token);
