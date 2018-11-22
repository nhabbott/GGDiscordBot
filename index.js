const Discord = require('discord.js');
const client = new Discord.Client();

const fs = require('fs');
const Enmap = require('enmap');
const color = require('chalk');
const config = require('./config.json');

client.config = config;
client.talkedRecently = new Set();
client.commands = new Enmap();
client.aliases = new Enmap();
client.myStatus = {
    lastSpoken: Date.now(),
    away: false,
    timeout: 900000
};

// Pretty console.logs
client.cColors = (type, message) => {
  switch (type) {
    case 'event':
      return '[GGBot]' + color.cyan('[Event]') + ` ${message}`;
    
    case 'init':
      return '[GGBot]' + color.yellow('[Init]') + ` ${message}`;

    case 'ready':
      return '[GGBot]' + color.green('[Ready]') + ` ${message}`;

    case 'error':
      return '[GGBot]' + color.red('[Error]') + ` ${message}`;

    default:
      break;
  }
};

// Loop through command modules
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  console.log(client.cColors('init', `Loading a total of ${files.length} commands`));
  files.forEach(f => {
    if(f.split(".").slice(-1)[0] !== "js") return;
    let props = require(`./commands/${f}`);
    client.commands.set(props.help.name, props);
    if(props.init) props.init(client);
    props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
    });
  });
});

// Loop through event modules.
fs.readdir('./events/', (err, files) => {
  if (err) console.error(err);
  console.log(client.cColors('init', `Loading a total of ${files.length} events`));
  files.forEach(file => {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

// Initialize warning json file
fs.readdir('./json/', (err, files) => {
  if (err) console.log(err);
  if (files.length === 0) {
    console.log(client.cColors('init', `Initializing a total of 1 JSON files`));
    fs.writeFile('./json/warns.json', '[]', 'utf8', (err) => {
      if (err) console.log(err);
    });
  } else {
    return;
  }
});

// Make exceptions pretty
process.on('uncaughtException', (err) => {
  let errorMsg = err.stack.replace(new RegExp(`${__dirname}\/`, 'g'), './');
  console.log(client.cColors('error', errorMsg));
});
  
// Make promise rejections pretty
process.on("unhandledRejection", err => {
  console.log(client.cColors('error', err));
});

// Login client with discord token.
client.login(config.token);
