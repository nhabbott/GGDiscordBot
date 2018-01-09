const { WebhookClient } = require("discord.js");

const embedColors = {
    mention: 3447003,
    error: 16711680,
    log: 16761676,
    warn: 14408465
};

module.exports = (client) => {
    client.log = (type, title, author, msg) => {
        const hook = new WebhookClient(client.config.webhook.id, client.config.webhook.token);
        const color = embedColors[type] || 3447003;
        let avatar;
        try { avatar = author.avatarURL(); }
        catch (e) { avatar = author.avatar; }
        hook.send({embed: {
          color,
          author: {
            name: `${author.tag} (${author.id})`,
            icon_url: avatar
          },
          title: title,
          description: msg
        }});
    };

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
    }

    process.on('uncaughtException', (err) => {
        let errorMsg = err.stack.replace(new RegExp(`${__dirname}\/`, 'g'), './');
        console.log(client.cColors('error', errorMsg));
    });
      
    process.on("unhandledRejection", err => {
        console.log(client.cColors('error', err));
    });
};