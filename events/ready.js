exports.run = (client) => {
    const color = require('chalk');
    
    client.user.setStatus('online');
    console.log('[GGBot]' + color.green('[Ready]') + ' Connection to Discord Established');
}