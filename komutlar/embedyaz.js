const Discord = require('discord.js');

exports.run = (client, message, args) => {
  let mesaj = args.slice(0).join(' ');
  const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setFooter(mesaj)
if (mesaj.length < 1) return message.reply('Yazmam için herhangi bir şey yazmalısın.');
  message.delete();
  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['embedsay', 'esay','eyaz'],
  permLevel: 0
};

exports.help = {
  name: 'embedyaz',
  description: 'İstediğiniz şeyi embed şeklinde bota yazdırır.',
  usage: 'embedyaz [yazdırmak istediğiniz şey]'
};