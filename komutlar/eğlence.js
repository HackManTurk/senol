const Discord = require("discord.js");
const moment = require("moment");
const colors = require("colors");
var green = process.env.NODE_DISABLE_COLORS ? '' : '\x1b[32m';

require("moment-duration-format");

exports.run = (client, msg) => {
  const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
  msg.channel.sendCode("EĞLENCE KOMUTLARI:",`
+emoniyazı istediniz cümleyi bot size emoji ile yazar 
+mkasözleri size sö söyler
+çayiç çay icmek 
+winner
+renksizpp
+koş koşma gif
+tekmeat isteddiniz kişiye tekme gif atar !
+slots kumar oynar
+simit gif simit
+bagir birma gir
+emojiyazı emjo harfleri ile yazi 
yazar
+sahtemesaj sahte mesaj yolar
`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'eğlence',
  description: 'Tüm komutları listeler. İsterseniz bir komut hakkında yardım eder..',
  usage: 'eğlence'
};