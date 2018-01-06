/**
 * Checks the forums to see if user has the 'Donator' rank.
 * If so, they are given the same rank in the Discord.
 */

exports.run = (client, message, args) => {
    const http = require('axios');
    const color = require('chalk');
    const config = require('../config.json');
    let user = message.member;

    http.get('url').then(res => {
        if (res.data === 'true') {
            let role = message.guild.roles.find('name', 'Donator');
            console.log('[GGBot]' + color.yellow('[Donations]') + `${user} has been promoted to the Donator role.`);
            user.addRole(role).then(message.reply(`has received their donator role. ${config.donation_thanks}`)).catch(err => {
                console.log('[GGBot]' + color.red('[Error] ') + err);
            });
        }
        //message.channel.send(res.data);
    }).catch(err => {
        console.log('[GGBot]' + color.red('[Error] ') + err);
        message.reply('We\'re sorry, it seems as though we received an error when trying to receive your information. Please send a message to Noah, Chris, Nighmare, or Nevexo.');
    });
}