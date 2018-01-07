const Discord = require('discord.js');
const client = new Discord.Client();

const fs = require('fs');
const config = require('./config.json');

// Loop through event modules.
fs.readdir('./events/', (err, files) => {
    if (err) return console.log('[GGBot]' + color.red('[Error] ') + err);

    files.forEach(file => {
        let eventFunction = require('./events/' + `${file}`);
        let eventName = file.split('.')[0];
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});

client.on('message', async message => {
    // Ignore messages from other bots.
    if (message.author.bot) return;

    // Ignore messages that don't start with our prefix.
    if (message.content.indexOf(config.prefix) !== 0) return;

    // Split received message into individual words and remove prefix.
    const args = message.content.split(/\s+/g);
    const command = args.shift().slice(config.prefix.length).toLowerCase();

    // Loop through command modules to find the requested command.
    try {
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, message, args);
        if (command !== 'clear') { message.delete(1000); }
    } catch (err) {
        console.log('[GGBot]' + color.red('[Error] ') + err);
    }
});

// Login client with discord token.
client.login(config.token);
