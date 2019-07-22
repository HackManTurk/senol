const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const weather = require('weather-js')
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader')(client);
const path = require('path');
const request = require('request');
const snekfetch = require('snekfetch');
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');


const app = express();
app.get("/", (request, response) => {
console.log(Date.now() + " Ping tamamdır.");
response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
if (err) console.error(err);
log(`${files.length} komut yüklenecek.`);
files.forEach(f => {
let props = require(`./komutlar/${f}`);
log(`Yüklenen komut: ${props.help.name}.`);
client.commands.set(props.help.name, props);
props.conf.aliases.forEach(alias => {
client.aliases.set(alias, props.help.name);
});
});
});




client.reload = command => {
return new Promise((resolve, reject) => {
try {
delete require.cache[require.resolve(`./komutlar/${command}`)];
let cmd = require(`./komutlar/${command}`);
client.commands.delete(command);
client.aliases.forEach((cmd, alias) => {
if (cmd === command) client.aliases.delete(alias);
});
client.commands.set(command, cmd);
cmd.conf.aliases.forEach(alias => {
client.aliases.set(alias, cmd.help.name);
});
resolve();
} catch (e) {
reject(e);
}
});
};

client.load = command => {
return new Promise((resolve, reject) => {
try {
let cmd = require(`./komutlar/${command}`);
client.commands.set(command, cmd);
cmd.conf.aliases.forEach(alias => {
client.aliases.set(alias, cmd.help.name);
});
resolve();
} catch (e) {
reject(e);
}
});
};




client.unload = command => {
return new Promise((resolve, reject) => {
try {
delete require.cache[require.resolve(`./komutlar/${command}`)];
let cmd = require(`./komutlar/${command}`);
client.commands.delete(command);
client.aliases.forEach((cmd, alias) => {
if (cmd === command) client.aliases.delete(alias);
});
resolve();
} catch (e) {
reject(e);
}
});
};

client.elevation = message => {
if (!message.guild) {
return;
}
let permlvl = 0;
if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
if (message.author.id === ayarlar.sahip) permlvl = 4;
return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
// console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});


client.on("guildMemberAdd", async member => {
let sayac = JSON.parse(fs.readFileSync("./autorole.json", "utf8"));
let otorole = JSON.parse(fs.readFileSync("./autorole.json", "utf8"));
let arole = otorole[member.guild.id].sayi
let giriscikis = JSON.parse(fs.readFileSync("./autorole.json", "utf8")); 
let embed = new Discord.RichEmbed()
.setTitle('Otorol Sistemi')
.setDescription(`:loudspeaker: :inbox_tray: @${member.user.tag}'a Otorol Verildi `)
.setColor("GREEN")
.setFooter("XiR", client.user.avatarURL);

if (!giriscikis[member.guild.id].kanal) {
return;
}

try {
let giriscikiskanalID = giriscikis[member.guild.id].kanal;
let giriscikiskanali = client.guilds.get(member.guild.id).channels.get(giriscikiskanalID);
giriscikiskanali.send(`:loudspeaker: :white_check_mark: Hoşgeldin **${member.user.tag}** Rolün Başarıyla Verildi.`);
} catch (e) { // eğer hata olursa bu hatayı öğrenmek için hatayı konsola gönderelim.
return console.log(e)
}

});
//Kullanıcı sunucudan ayrıldığında ayarlanan kanala mesaj gönderelim.
client.on("guildMemberAdd", async (member) => {
let autorole = JSON.parse(fs.readFileSync("./autorole.json", "utf8"));
let role = autorole[member.guild.id].sayi

member.addRole(role)




});
//XiR


client.on("message", msg => {
var dm = client.channels.get("596965998293417985")
if(msg.channel.type === "dm") {
if(msg.author.id === client.user.id) return;
const botdm = new Discord.RichEmbed()
.setTitle(`${client.user.username} Dm`)
.setTimestamp()
.setColor("RED")
.setThumbnail(`${msg.author.avatarURL}`)
.addField("Gönderen", msg.author.tag)
.addField("Gönderen ID", msg.author.id)
.addField("Gönderilen Mesaj", msg.content)

dm.send(botdm)

}
if(msg.channel.bot) return;
});
//XiR

client.on("message", async message => {
let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
if(sayac[message.guild.id]) {
if(sayac[message.guild.id].sayi <= message.guild.members.size) {
const embed = new Discord.RichEmbed()
.setDescription(`Tebrikler ${message.guild.name}! Başarıyla **${sayac[message.guild.id].sayi}** kullanıcıya ulaştık! Sayaç sıfırlandı!`)
.setColor(ayarlar.renk)
.setTimestamp()
message.channel.send({embed})
delete sayac[message.guild.id].sayi;
delete sayac[message.guild.id];
fs.writeFile("./ayarlar/sayac.json", JSON.stringify(sayac), (err) => {
console.log(err)
})
}
}
})

client.on("guildMemberAdd", async member => {
let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
const channel = member.guild.channels.find("name", "sayaç")
channel.send(`**${member.user.tag}** Katıldı 😎 **${sayac[member.guild.id].sayi}** olmamıza son **${sayac[member.guild.id].sayi - member.guild.members.size}** üye kaldı!`)
})

client.on("guildMemberRemove", async member => {
let sayac = JSON.parse(fs.readFileSync("./ayarlar/sayac.json", "utf8"));
const channel = member.guild.channels.find("name", "sayaç")
channel.send(`**${member.user.tag}** Ayrıldı 🙁 **${sayac[member.guild.id].sayi}** olmamıza son **${sayac[member.guild.id].sayi - member.guild.members.size}** üye kaldı!`)
})
//XiR

client.login(ayarlar.token);
//XiR