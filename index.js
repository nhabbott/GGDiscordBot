const Discord = require('discord.js');
const client = new Discord.Client();

const fs = require('fs');
const Enmap = require('enmap');
const EnmapLevel = require('enmap-level');
const color = require('chalk');
const config = require('./config.json');

client.commands = new Enmap();
client.aliases = new Enmap();
client.myStatus = {
    lastSpoken: Date.now(),
    away: false,
    timeout: 900000
};

client.config = config;
client.db = require("./modules/PersistentDB.js");
client.cColors = (type, message) => {
    switch (type) {
        case 'event':
            return '[GGBot]' + color.cyan('[Event]') + ` ${message}`;
            break;
        
        case 'init':
            return '[GGBot]' + color.yellow('[Init]') + ` ${message}`;
            break;

        case 'ready':
            return '[GGBot]' + color.green('[Ready]') + ` ${message}`;
            break;

        case 'error':
            return '[GGBot]' + color.red('[Error]') + ` ${message}`;
            break;

        case 'ban':
            return '[GGBot]' + color.red('[Ban]') + ` ${message}`;
            break;

        default:
            break;
    }
};

// Loop through command modules
fs.readdir('./commands/', (err, files) => {
    if (err) console.error(err);
    console.log(`[GGBot]` + color.yellow('[Init]') + ` Loading a total of ${files.length} commands`);
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
    console.log(`[GGBot]` + color.yellow('[Init]') + ` Loading a total of ${files.length} events`);
    files.forEach(file => {
      const eventName = file.split(".")[0];
      const event = require(`./events/${file}`);
      client.on(eventName, event.bind(null, client));
      delete require.cache[require.resolve(`./events/${file}`)];
    });
  });

// Login client with discord token.
client.login(config.token);
