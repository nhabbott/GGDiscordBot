module.exports = async (client, message) => {
  if (client.talkedRecently.has(message.author.id)) return;
  if (message.author.bot) return;
  client.myStatus.lastSpoken = Date.now();
  if (client.myStatus.away) client.myStatus.away = false;
  if (message.content.indexOf(client.config.prefix) !== 0) return;

  const args = message.content.split(/ +/g);
  const command = args.shift().slice(client.config.prefix.length).toLowerCase();

  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

  if (cmd) {
    message.flags = [];
    while(args[0] && args[0][0] === `-`) {
    message.flags.push(args.shift().slice(1));
  }
  
  cmd.run(client, message, args);
  if (command !== 'purge') message.delete(0);
    client.talkedRecently.add(message.author.id);
    setTimeout(() => {
      client.talkedRecently.delete(message.author.id);
    }, client.config.cooldown);
  } else if (client.tags.has(command)) {
    message.edit(`${args.join(' ')} ${client.tags.get(command).contents}`);
  }
};