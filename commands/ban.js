exports.run = (client, message, args) => {
    let person = args[0];
    let reason = args [1];

    message.guild.ban(person, days).then(() => {
        console.log(client.cColors('ban', `${user.displayName} banned ${message.mentions.members.first().displayName} and removed ${days} days of messages`));
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
    usage: 'ban [mention]'
};