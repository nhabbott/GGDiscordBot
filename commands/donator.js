const http = require('axios');

exports.run = (client, message, args) => {
  // Send GET request to config URL to check if user deserves donator
  http.get(client.cofnig.donationUrl).then(res => {
    // If result data contains true
    if (res.data === 'true') {
      // Find the donator role
      let role = message.guild.roles.find((r) => r.name === client.config.donationRole); 

      // Add the donator role to the user
      message.member.addRole(role).then(message.reply(`has received their donator role. ${client.config.messages.donation_thanks}`)).catch(err => {
        console.log(client.cColors('error', `${err}`));
      });
    }
    console.log(client.cColors('event', `${message.member.displayName} has been promoted to the Donator role.`));
    //message.channel.send(res.data);
  }).catch(err => {
    console.log(client.cColors('error', `${err}`));
    message.reply('we\'re sorry, it seems as though we received an error when trying to receive your information. Please send a message to Noah, Chris, Nighmare, or Nevexo.');
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