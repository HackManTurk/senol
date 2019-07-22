const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message) => {
 message.channel.send({embed: {
		  file:"https://media.giphy.com/media/XJc0btNlYQaO2hqmEg/giphy.gif",
          color: 0xD97634,
		  description: "**:exclamation:  BAĞIRMAK GÜZELDİR !**"
            }});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['p'],
  permLevel: 0
};

exports.help = {
  name: 'bağır',
  description: 'Bağırmanızı sağlar.',
  usage: 'bağır'
};