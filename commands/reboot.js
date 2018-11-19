const {promisify} = require("util");
const write = promisify(require("fs").writeFile);
exports.run = async (client, message, args) => {
  if (!client.config.admins.includes(message.member.highestRole.name)) { 
    message.reply('You do not have permission to access this command!');  
    console.log(client.cColors('event', `${message.member.displayName} tried to access the '${client.config.prefix}reboot' command`)); 
    return;
  }
  await message.reply("Rebooting...");
  await write('./reboot.json', `{"id": "${message.id}", "channel": "${message.channel.id}"}`).catch(err=>console.log(client.cColors('error', `${err}`)));
  process.exit(1);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["restart"],
  permLevel: 0
};

exports.help = {
  name: 'reboot',
  description: 'Restarts bot and indicates the reboot time.',
  usage: 'reboot'
};