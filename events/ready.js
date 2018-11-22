const color = require('chalk');

module.exports = (client) => {
  // If first time to join a guild, then find all current users and add to warn file
  if (client.config.firstJoin) {
    let fs = require('fs');
    let warnsFile = JSON.parse(fs.readFileSync('./json/warns.json'));
    let members = client.guilds.first().members.filter((member) => !member.user.bot);

    members.forEach((member) => {
      warnsFile.push({"id": `${member.user.id}`, "warns": 0});
      console.log(client.cColors('init', `Created warns.json entry for ${member.user.id}`));
    }); 

    let newWarnsFile = JSON.stringify(warnsFile);
    fs.writeFileSync('./json/warns.json', newWarnsFile, 'utf8', (err) => {
      console.log(client.cColors('error', err));
    });

    // Change client config
    let config = JSON.parse(fs.readFileSync('./config.json'));
    config.firstJoin = false
    let newConfig = JSON.stringify(config);
    fs.writeFileSync('./config.json', newConfig, 'utf8', (err) => {
      console.log(client.cColors('error', err));
    });
  }

  // Init bot
  client.user.setStatus('online');
  client.user.setActivity(`Say ${client.config.prefix}help`);
  console.log(client.cColors('ready', 'Connection to Discord Established'));
};