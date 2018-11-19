module.exports = (client, message) => {
  // Find guild
  let guild = message.member.guild();

  // Send welcome message to guilds default channel
  guild.defaultChannel.send(`${client.config.messages.welcome_message}`).catch(console.log('[GGBot]' + color.red('[Error] ') + err));

  // Make new warn file entry for user
  let fs = require('fs');
  let warnsFile = JSON.parse(fs.readFileSync('./json/warns.json'));

  warnsFile.push({"id": `${message.member.user.id}`, "warns": 0});
  let newWarnsFile = JSON.stringify(warnsFile);
  fs.writeFileSync('./json/warns.json', newWarnsFile, 'utf8', (err) => {
    client.cColors('error', err);
  });
}