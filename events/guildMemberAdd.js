exports.run = (client, member) => {
    const config = require('../config.json');
    let guild = member.guild();
    guild.defaultChannel.send(`${config.welcome_message}`).catch(console.log('[GGBot]' + color.red('[Error] ') + err));
}