exports.run = (client, message, args) => {
    let user = message.member;

    if (user.roles.some(r=>["Engineer", "Founder"].includes(r.name))) {
        message.channel.send('');
        console.log(client.cColors('event', `${user.displayName} used the '${client.config.prefix}status' command`));
    } else {
        message.reply('You do not have permission to access this command!');
        console.log(client.cColors('event', `${user.displayName} tried to access the '${client.config.prefix}status' command`));
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: []
};

exports.help = {
    name: 'status',
    description: 'Sends a message containing bot information',
    usage: 'status'
};