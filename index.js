const Discord = require('discord.js');
const client = new Discord.Client();

const http = require('axios');
const color = require('chalk');
const config = require('./config.json');

client.on('ready', () => {
    client.user.setStatus('online');
    console.log('[GGBot]' + color.green('[Ready]') + ' Connection to Discord Established');
});

client.on('message', async message => {
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;

    const args = message.content.slice(config.prefix.length).trim().split(' ');

    let user = message.member;
    let errors = 0;

    switch (args[0].toLowerCase()) {
        case 'help':
            user.send('ENTER COMMANDS HERE');
            break;

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
                message.channel.send(res.data);
            }).catch(err => {
                errors++;
                console.log('[GGBot]' + color.red('[Error] ') + err);
                message.reply('We\'re sorry, it seems as though we received an error when trying to receive your information. Please send a message to Noah, Chris, Nighmare, or Nevexo.');
            });
            break;
        
        case 'status':
            if (user.roles.some(r=>["Engineer", "Founder"].includes(r.name))) {
                user.send(`Total errors since last start: ${errors}`);
            } else {
                message.reply(' You do not have permission to access this command!');
            }
            break;
        
        case 'song':
            break;
        
        default:
            break;
    }
});

client.login(config.token);
