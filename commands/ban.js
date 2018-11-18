exports.run = (client, message, args) => {
  if (!client.config.admins.includes(message.member.highestRole.name)) {
    message.reply('you do not have permission to access this command!'); 
    console.log(client.cColors('event', `${message.member.displayName} tried to access the '${client.config.prefix}clear' command`)); 
    return;
  }

  if (args[0] == null) {
    message.reply('Please provide a person to ban by mentioning them');
  } else if (args[1] == null) {
    message.reply('Please provide a reason for the ban');
  } else if (args[2] == null) {
    message.reply('Please provide the number of days of messages to remove');
  }

  let reason = args[1];
  let days = args[2];

  message.mentions.members.first().ban({days: days, reason: reason}).then(() => {
    console.log(client.cColors('ban', `${message.member.displayName} banned ${message.mentions.members.first().displayName || args[0]} with a reason of ${reason} and removed ${days} days of messages`));
  }).catch((err) => {
    console.log(client.cColors('error', `${err}`));
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: []
};

exports.help = {
  name: 'ban',
  description: 'Bans the mentioned user',
  usage: 'ban [mention] [reason] [days of messages to remove]'
};