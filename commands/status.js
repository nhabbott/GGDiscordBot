const Discord = require('discord.js');
const moment = require('moment');
require('moment-duration-format');

exports.run = (client, message, args) => {
  if (!client.config.admins.includes(message.member.highestRole.name)) {
      message.reply('You do not have permission to access this command!'); 
      console.log(client.cColors('event', `${message.member.displayName} tried to access the '${client.config.prefix}status' command`)); 
      return;
  }
  const duration = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');
  message.channel.send(`= STATISTICS =
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime     :: ${duration}
• Users      :: ${client.users.size.toLocaleString()}
• Servers    :: ${client.guilds.size.toLocaleString()}
• Channels   :: ${client.channels.size.toLocaleString()}
• Discord.js :: v${Discord.version}
• Node       :: ${process.version}`, {code: "asciidoc"});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'status',
  description: 'Gives some useful bot statistics',
  usage: 'status'
};