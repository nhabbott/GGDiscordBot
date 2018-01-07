exports.run = (client, message, args) => {
    let user = message.member;

    if (user.hasPermission('MANAGE_MESSAGES')) {
        message.channel.fetchMessages().then((list) => {
            console.log(client.cColors('event', `${user.displayName} cleared ${list.size} messages from #${message.channel.name}`));
            message.channel.bulkDelete(list);
        }).catch((err) => {
            console.log(client.cColors('error', `${err}`));
        });
    } else {
        message.reply('You do not have permission to access this command!');
        console.log(client.cColors('event', `${user.displayName} tried to access the '${client.config.prefix}clear' command`));
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: []
};

exports.help = {
    name: 'clear',
    description: 'Clears all messages in the channel that the command is sent in',
    usage: 'clear'
};