exports.run = async (client, message, args) => {
    if (!message.member.roles.some(r=>["Engineer", "Founder"].includes(r.name))) message.reply('You do not have permission to access this command!'); console.log(client.cColors('event', `${user.displayName} tried to access the '${client.config.prefix}clear' command`)); return;
    let user = message.mentions.users.first() || client.users.get(args[0]);
    let amount = !!user ? parseInt(message.content.split(" ")[2], 10) : parseInt(message.content.split(" ")[1], 10);
    if (!amount) return message.edit("You must specify an amount to delete!").then(message.delete(2000));
    if (!amount && !user) return message.edit("You must specify a user and amount, or just an amount, of messages to purge!").then(message.delete(2000));

    await message.delete();
    let messages = await message.channel.messages.fetch({limit: 100});

    if(user) {
        messages = messages.array().filter(m=>m.author.id === user.id);
        console.log(client.cColors('event', `${message.member.displayName} cleared ${list.size} of ${user}'s messages from #${message.channel.name}`));
        messages.length = amount;
    } else {
        messages = messages.array();
        messages.length = amount + 1;
    }
    messages.map(async m => await m.delete().then(console.log(client.cColors('event', `${message.member.displayName} cleared ${list.size} messages from #${message.channel.name}`))).catch(err=>console.log(client.cColors('error', `${err}`))));
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