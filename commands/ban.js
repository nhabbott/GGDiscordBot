exports.run = (client, message, args) => {
  // Check if caller has bot admin rights
  if (!client.config.admins.includes(message.member.highestRole.name)) {
    message.reply('you do not have permission to access this command!'); 
    console.log(client.cColors('event', `${message.member.displayName} tried to access the '${client.config.prefix}ban' command`)); 
    return;
  }

  // Check if all the required args are provided
  if (args[0] == null) {
    return message.reply('please provide a person to ban by mentioning them');
  } else if (args[2] == null) {
    return message.reply('please provide a reason for the ban');
  } else if (args[1] == null) {
    return message.reply('please provide the number of days of messages to remove');
  }

  let reason = "";
  let days = args[1];

  if (args.length > 3) {
    args.forEach((arg, i) => {
      if (i < 3) {
        i++;
      } else if ( i === (args.length - 1)) {
        reason += args[i];
      } else {
        reason += args[i] + " "
      }
    });
  }

  // Ban the mentioned player for specified reason & delete specified number of days of messages
  message.mentions.members.first().ban({days: days, reason: reason}).then(() => {
    console.log(client.cColors('event', `${message.member.displayName} banned ${message.mentions.members.first().displayName} with a reason of ${reason} and removed ${days} days of messages`));
  }).catch((err) => {
    console.log(client.cColors('error', `${err}`));
  });

  // Find bot log channel
  let channel = client.channels.find((c) => c.id === client.config.modChannel);

  // Send Ban embed to bot log channel
  channel.send({embed: {
    color: 16711680,
    author: {
      name: message.member.displayName,
      icon_url: message.member.user.avatarURL
    },
    title: 'Ban',
    description: `${message.mentions.members.first().user.id} has been banned for ${reason}.`,
    fields: [{
      name: 'Reason:',
      value: `${reason}`
    }],
    timestamp: new Date(),
    footer: {
      icon_url: message.mentions.members.first().user.avatarURL,
      text: `${message.mentions.members.first().user.tag} banned. Messages from past ${days} days deleted.`
    }
  }});
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: []
};

exports.help = {
  name: 'ban',
  description: 'Bans the mentioned user',
  usage: 'ban [mention] [days of messages to remove] [reason]'
};