exports.run = async (client, message, args) => {
  if (!client.config.admins.includes(message.member.highestRole.name)) {
    message.reply('you do not have permission to access this command!'); 
    console.log(client.cColors('event', `${message.member.displayName} tried to access the '${client.config.prefix}purge' command`)); 
    return;
  }

  let user = null;
  let amount = null;

  if (message.mentions.users.first() != undefined) {
    user = message.mentions.users.first();
    if (args[1].match('^[0-9]*$')) {
      if (message.author.id === user.id) {
        amount = Number(args[1]) + 1;
      } else {
        amount = Number(args[1]);
      }
    }
  } else if (args[0].match('^[0-9]*$')) {
    amount = Number(args[0]) + 1;
  }

  if (amount === null) return message.reply("you must specify an amount to delete!");
  if (user != null && amount === null) return message.reply("you must specify an amount of messages to remove!");
  if (amount === null && user === null) return message.reply("you must specify a user and amount, or just an amount, of messages to purge!");

  let messages = await message.channel.fetchMessages({limit: Number(amount)});

  if (user != null) {
    messages = messages.filter((m) => m.author.id === user.id);
  }

  //message.channel.bulkDelete(messages);
  
  messages.forEach((message) => {
    message.delete();
  });

  console.log(client.cColors('event', `${message.member.displayName} cleared ${messages.size - 1} messages from #${message.channel.name}`));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: []
};

exports.help = {
  name: 'purge',
  description: 'Deletes messages from anyone in the channel',
  usage: 'purge [mention] [number of messages] or purge [number of messages]'
};