exports.run = (client, message, args) => {
    let user = message.member;
    
    if (user.hasPermission('MANAGE_MESSAGES')) {
        message.channel.fetchMessages().then((list) => {
            message.channel.bulkDelete(list);
        }).catch((err) => {
            console.log('[GGBot]' + color.red('[Error] ') + err);
        });
    }
}