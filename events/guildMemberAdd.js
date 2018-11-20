module.exports = (client, member) => {
  // Find guild
  //let guild = member.guild;

  // Send welcome message to guilds default channel
  //guild.defaultChannel.send(`${client.config.messages.welcome_message}`).catch(console.log('[GGBot]' + color.red('[Error] ') + err));

  // Make new warn file entry for user
  let fs = require('fs');
  let warnsFile = JSON.parse(fs.readFileSync('./json/warns.json'));

  warnsFile.push({"id": `${member.user.id}`, "warns": 0});
  let newWarnsFile = JSON.stringify(warnsFile);
  fs.writeFileSync('./json/warns.json', newWarnsFile, 'utf8', (err) => {
    console.log(client.cColors('error', err));
  });
  console.log(client.cColors('event', `Created warns.json entry for ${member.user.id}`));
}