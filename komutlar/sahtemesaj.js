const Discord = require('discord.js');

exports.run = function (client, message, args) {
    let kişi = message.mentions.users.first();
    if (message.mentions.users.size < 1) return message.reply(':clapper:**Geçersiz İşlem!** \n Yazilacak Olan **Mesajı** ve **Kişiyi** Yazmalisin \n `Doğru Kullanım: x+fakemesaj [@Kullanici#1234] [Mesaj]`!')
    
    let yazi = args.join(" ").slice(22);
    if (!yazi) return message.reply(':clapper:**Geçersiz İşlem!** \n Yazilacak Olan **Mesajı** ve **Kişiyi** Yazmalisin \n `Doğru Kullanım: x+fakemesaj [@Kullanici#1234] [Mesaj]`!')
    message.delete();
    message.channel.createWebhook(kişi.username, kişi.avatarURL)
    .then(webhook => webhook.edit(kişi.username, kişi.avatarURL)
        .then(wb => {
            const hook = new Discord.WebhookClient(wb.id, wb.token);
            hook.send(yazi)
            hook.delete()
        })
        .catch(console.error))
        .catch(console.error);
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["fakemesaj"],
  permLevel: 0
};

module.exports.help = {
  name: 'sahtemesaj',
  description: 'Belirlediğiniz kişi için sahte mesaj gönderirsiniz',
  usage: 'sahtemesaj @kullanıcı mesajınız'
};
//XiR