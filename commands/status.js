/**
 * Sends a private message to the user which contains bot information.
 */

exports.run = (client, message, args) => {
    const color = require('chalk');
    let user = message.member;

    if (user.roles.some(r=>["Engineer", "Founder"].includes(r.name))) {
        message.channel.send('');
    } else {
        message.reply('You do not have permission to access this command!');
    }
}