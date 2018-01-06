/**
* Sends a private message to the user which contains all available bot commands.
*/

exports.run = (client, message, args) => {
    const color = require('chalk');
    let user = message.member;
    
    user.send('ENTER COMMANDS HERE');
    message.delete(1000);
}