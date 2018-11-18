exports.run = (client, message, args) => {
    const http = require('axios');
    const config = require('../config.json');
    let user = message.member;

    http.get(client.cofnig.donationUrl).then(res => {
        if (res.data === 'true') {
            let role = message.guild.roles.find('name', 'Donator');
            console.log(client.cColors('event', `${user.displayName} has been promoted to the Donator role.`));
            user.addRole(role).then(message.reply(`has received their donator role. ${config.messages.donation_thanks}`)).catch(err => {
                console.log(client.cColors('error', `${err}`));
            });
        }
        //message.channel.send(res.data);
    }).catch(err => {
        console.log(client.cColors('error', `${err}`));
        message.reply('We\'re sorry, it seems as though we received an error when trying to receive your information. Please send a message to Noah, Chris, Nighmare, or Nevexo.');
    });
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: []
};

exports.help = {
    name: 'donator',
    description: 'Gives the user the donator rank, if deserved',
    usage: 'donator'
};