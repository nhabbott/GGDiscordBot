const color = require('chalk');

module.exports = (client) => {
    // Init bot
    client.user.setStatus('online');
    client.user.setActivity(`Say ${client.config.prefix}help`);
    console.log('[GGBot]' + color.green('[Ready]') + ' Connection to Discord Established');
};