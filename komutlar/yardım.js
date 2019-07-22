 const Discord = require('discord.js');
const loglar = require('../loglar.json');

var prefix = loglar.prefix;

exports.run = async (client, message, params, args) => {

  const yardım = new Discord.RichEmbed()
  .setColor(0x36393E)
      .setAuthor(`Eğlence`, client.user.avatarURL)
      .setThumbnail(client.user.avatarURL)
      .addField(`Eğlence - Yardım`, `:white_small_square:| **+yetkili**:Botun komutları.\n:white_small_square:| **+eğlence**:Botun  komutları.\n :white_small_square:| **+ekkomutlar**:Ek komutları`)
      .setFooter(`${message.author.username} tarafından kullanıldı.`, message.author.avatarURL)
  return message.channel.sendEmbed(yardım);

};


  
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['komut', 'komutlar', 'command', 'yardım', 'help', 'halp', 'y', 'h', 'commands'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'yardım',
    description: 'Komut listesini gösterir.',
    usage: 'yardım'
  };