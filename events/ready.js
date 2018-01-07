module.exports = (client) => {
    const color = require('chalk');

    client.user.setStatus('online');
    client.user.setGame(`Say ${client.config.prefix}help`);
    console.log('[GGBot]' + color.green('[Ready]') + ' Connection to Discord Established');
};