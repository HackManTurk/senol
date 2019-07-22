const Discord = require("discord.js");
const moment = require("moment");
const colors = require("colors");
var green = process.env.NODE_DISABLE_COLORS ? '' : '\x1b[32m';

require("moment-duration-format");

exports.run = (client, msg) => {
  const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
  msg.channel.sendCode("YETKILI  KOMUTLARI:",`
+ban @kulanici bir kisiyye ban atarsiniz
+sayac sayac ayarlarsiniz
+otorol otamatik rol verir
+giriş-çıkış resimli hg by
+sil mesajlari siler
+sunucu-kur sunucu oda ve roler kurar
+küfürengelle aç kimse kufur edeme
+davet botu davet edersiniz
+canlıdestek botunsahibiyle itirabe gecersiniz
`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'yetkili',
  description: 'Tüm komutları listeler. İsterseniz bir komut hakkında yardım eder..',
  usage: 'yetkili'
};