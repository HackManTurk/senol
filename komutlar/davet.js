const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    
  var embed = new Discord.RichEmbed()
  .setColor('BLUE')
  .setAuthor("Eglence", client.user.avatarURL)
  .addField("Eglence Botunu Ekleyiniz", "[Buraya tıklayarak](https://discordapp.com/oauth2/authorize?client_id=601051737834520578&scope=bot&permissions=2146958847) ekleyebilirsiniz.")
  .addField("Destek Sunucumuz", " [Buraya tıklayarak](https://discord.gg/ZVcF3h) Gele Bilirsiniz.")
  message.channel.send({embed: embed})
  
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["info","Bilgi","İnfo","davet","İnvite","invite","Davet","ekle","website","support","destek"],
    permLevel: 0,
    
}

exports.help = {
    name: 'davet',
  description: 'Davetiye bilgilerini gösterir',
  usage: 'dbilgi '
};


// NOX
   