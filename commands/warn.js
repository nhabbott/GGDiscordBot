const moment = require('moment');

exports.run = (client, message, args) => {
  // Check if caller has bot admin rights
  if (!client.config.admins.includes(message.member.highestRole.name)) {
    message.reply('you do not have permission to access this command!'); 
    console.log(client.cColors('event', `${message.member.displayName} tried to access the '${client.config.prefix}warn' command`)); 
    return;
  }
  
  // Check if required args are provided & if user provided is bot admin then stop
  if (args[0] === null) {
    return message.reply('please provide a user to warn by mentioning them');
  } else if (args[1] === null) {
    return message.reply('please provide a reason for the warning');
  } //else if (client.config.admins.includes(message.mentions.members.first().highestRole.name)) {
    //return message.reply('you can\'t warn moderators');
  //}

  // Find bot log channel
  let channel = client.channels.find((c) => c.id === client.config.modChannel);

  // Read warn.json file
  let fs = require('fs');
  let warnsFile = JSON.parse(fs.readFileSync('./json/warns.json'));

  let warnsVar = 0;
  let color = 0;
  let reason = "";

  if (args.length > 1) {
    args.forEach((arg, i) => {
      if (i < 1) {
        i++;
      } else if ( i === (args.length - 1)) {
        reason += args[i];
      } else {
        reason += args[i] + " "
      }
    });
  }

  // Loop through warns file and find the specified user
  warnsFile.forEach((warn, i, arr) => {
    if (warn.id === message.mentions.members.first().user.id) {
      // Grab previous warns and add the new one
      warnsVar = warn.warns + 1;

      // Set color for embed
      if (warnsVar === 1) {
        color = 15461146;
      } else if (warnsVar === 2) {
        color = 15247130;
      } else if (warnsVar === 3) {
        color = 16711680;
      }

      // Update the warns file 
      if (!(warnsVar === client.config.banAfterWarns)) {
        // If the user has less than client.config.banAfterWarns then update warns file
        warn.warns = warn.warns + 1;
        let obj = JSON.stringify(warnsFile);
        fs.writeFileSync('./json/warns.json', obj, 'utf8', (err) => {
          console.log(client.cColors('error', err));
        });

        // Send embed to bot log channel for warning
        channel.send({embed: {
          color: color,
          author: {
            name: message.member.displayName,
            icon_url: message.member.user.avatarURL
          },
          title: `Warning #${String(warnsVar)}`,
          description: `${message.mentions.members.first().user.id} has been warned for ${reason}.`,
          timestamp: new Date(),
          footer: {
            icon_url: message.mentions.members.first().user.avatarURL,
            text: `${message.mentions.members.first().user.tag} has been warned.`
          }
        }});

        console.log(client.cColors('event', `${message.member.displayName} warned ${message.mentions.members.first().displayName} for '${reason}'`));
      } else if (warnsVar === client.config.banAfterWarns) {
        // If the user has greater than or equal to client.config.banAfterWarns then remove them from warns file
        arr.splice(i, 1);
        let obj = JSON.stringify(warnsFile);
        fs.writeFileSync('./json/warns.json', obj, 'utf8', (err) => {
          console.log(client.cColors('error', err));
        });

        // Ban user
        message.mentions.members.first().ban('Maximum number of warnings met').then(() => {
          // Send auto ban enbed to bot log channel
          channel.send({embed: {
            color: 16711680,
            author: {
              name: message.member.displayName,
              icon_url: message.member.user.avatarURL
            },
            title: 'Auto Ban',
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
    } else if (i > arr.length) {
      message.reply('no user was found in the warns file');
      console.log(client.cColors('error', `${message.member.displayName} tried to warn '${message.mentions.members.first().displayName}' but their user id was not found in the warns file`));
      return false;
    } else {
      i++;
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
  usage: 'warn [mention] [reason]'
};