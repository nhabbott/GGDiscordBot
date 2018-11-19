const moment = require('moment');

exports.run = (client, message, args) => {
  if (!client.config.admins.includes(message.member.highestRole.name)) {
    message.reply('you do not have permission to access this command!'); 
    console.log(client.cColors('event', `${message.member.displayName} tried to access the '${client.config.prefix}warn' command`)); 
    return;
  }
  
  if (args[0] === null) {
    return message.reply('please provide a user to warn by mentioning them');
  } else if (args[1] === null) {
    return message.reply('please provide a reason for the warning');
  } else if (client.config.admins.includes(message.mentions.members.first().highestRole.name)) {
    return message.reply('you can\'t warn moderators');
  }

  let channel = client.channels.find((c) => c.id === client.config.modChannel);

  let fs = require('fs');
  let warnsFile = JSON.parse(fs.readFileSync('./json/warns.json'));
  let warnsVar = null;
  let color = null;

  warnsFile.forEach((warn, i, arr) => {
    if (warn.id === message.mentions.members.first().user.id) {
      warnsVar = warn.warns + 1;

      if (warnsVar === 1) {
        color = 15461146;
      } else if (warnsVar === 2) {
        color = 15247130;
      } else if (warnsVar === 3) {
        color = 16711680;
      }

      if (!(warnsVar > client.config.banAfterWarns)) {
        warn.warns = warn.warns + 1;
        let obj = JSON.stringify(warnsFile);
        fs.writeFileSync('./json/warns.json', obj, 'utf8', (err) => {
          client.cColors('error', err);
        });
      } else if (warnsVar >= client.config.banAfterWarns) {
        arr.splice(i, 1);
        let obj = JSON.stringify(warnsFile);
        fs.writeFileSync('./json/warns.json', obj, 'utf8', (err) => {
          client.cColors('error', err);
        });
      }

      channel.send({embed: {
        color: color,
        author: {
          name: message.member.displayName,
          icon_url: message.member.user.avatarURL
        },
        title: `Warning #${String(warnsVar)}`,
        description: `${message.mentions.members.first().user.id} has been warned for ${args[1]}.`,
        timestamp: new Date(),
        footer: {
          icon_url: message.mentions.members.first().user.avatarURL,
          text: `${message.mentions.members.first().user.tag} has been warned.`
        }
      }});

      console.log(client.cColors('event', `${message.member.displayName} warned ${message.mentions.members.first().displayName} for '${args[1]}'`));

      if (warn.warns === client.config.banAfterWarns) {
        message.mentions.members.first().ban('Maximum number of warnings met').then(() => {
          channel.send({embed: {
            color: 16711680,
            author: {
              name: message.member.displayName,
              icon_url: message.member.user.avatarURL
            },
            title: `Auto Ban`,
            description: `${message.mentions.members.first().user.id} has been banned. (Maximum warnings exceeded (${client.config.banAfterWarns}))`,
            fields: [{
              name: 'Reason:',
              value: `${args[1]}`
            }],
            timestamp: new Date(),
            footer: {
              icon_url: message.mentions.members.first().user.avatarURL,
              text: `${message.mentions.members.first().user.tag} banned. Messages from past 0 days deleted.`
            }
          }});

          console.log(client.cColors('event', `${message.mentions.members.first().displayName} was banned becaused they reached the maximum number of warns`));
        }).catch((err) => {
          console.log(client.cColors('error', `${err}`));
        });
      }
    }
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: []
};

exports.help = {
  name: 'warn',
  description: 'Warns the mentioned user',
  usage: 'warn [mention] [message]'
};