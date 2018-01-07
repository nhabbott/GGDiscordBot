exports.run = (client) => {
    const color = require('chalk');
    const config = require('../config.json');

    client.user.setStatus('online');
    client.user.setGame(`Say ${config.prefix}help`);
    console.log('[GGBot]' + color.green('[Ready]') + ' Connection to Discord Established');
}