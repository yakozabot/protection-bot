const express = require("express");
const app = express();

app.listen(() => console.log("Server started"));

app.use('/ping', (req, res) => {
  res.send(new Date());
});


const Discord = require('discord.js');
const client = new Discord.Client();
const cmd = require("node-cmd");
const ms = require("ms");
const fs = require('fs');
const ytdl = require("ytdl-core");
const canvas = require("canvas");
const convert = require("hh-mm-ss")
const fetchVideoInfo = require("youtube-info");
const simpleytapi = require('simple-youtube-api')
const util = require("util")
const gif = require("gif-search");
const jimp = require("jimp");
const guild = require('guild');
const hastebins = require('hastebin-gen');
const getYoutubeID = require('get-youtube-id');
const pretty = require("pretty-ms");
const moment = require('moment');
const request = require('request');
const dateFormat = require('dateformat');

////////////////////////////////////////////////////////////////////////



const prefix = "/"
const developers = "564742981912100865"

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
   client.user.setActivity("SooN ",{type: 'PLAYING'})
});


/////////////////////////////////  info-bot  /////////////////////////////////

client.on('message', message => { 
    if (message.content.startsWith(prefix + "bot")) { 
    message.channel.send({ 
        embed: new Discord.RichEmbed() 
            .setAuthor(client.user.username,client.user.avatarURL) 
            .setThumbnail(client.user.avatarURL) 
            .setColor('RANDOM') 
            .setTitle('Info BiiMO Bots.') 
            .addField(' <:wifi:738862790957072475> **My Ping**' , [`${Date.now() - message.createdTimestamp}` + 'MS'], true) 
            .addField('**RAM Usage**', `[${(process.memoryUsage().rss / 1048576).toFixed()}MB]`, true) 
            .addField('**Servers**', [client.guilds.size], true) 
            .addField('**Channels**' , `[ ${client.channels.size} ]` , true) 
            .addField('**Users**' ,`[ ${client.users.size} ]` , true) 
            .addField('**My Name**' , `[ ${client.user.tag} ]` , true) 
            .addField('**My ID**' , `[ ${client.user.id} ]` , true) 
            .addField(" <:727881781746860073:738871839358582939> **Bot Owner** :  ", `» <@564742981912100865>`, true)
            .addField('**DiscordJS**' , `[ ${Discord.version} ]` , true) 
            .addField(' <:nodejs:738872884252114965> **NodeJS**' , `[ ${process.version} ]` , true) 
            .addField('**My Prefix**' , `[ ${prefix} ]` , true) 
            .addField('**My Language**' , `[ Java Script ]` , true)
            .setFooter('Support Server => /support') 
    }) 
} 
}); 

/////////////////////////////////  command-mute  /////////////////////////////////

   const mmss = require('ms');
  client.on('message', async message => {
    let muteembed = new Discord.RichEmbed()

      let muteReason = message.content.split(" ").slice(3).join(" ");
      let mutePerson = message.mentions.users.first();
      let messageArray = message.content.split(" ");
      let muteRole = message.guild.roles.find("name", "Muted");
      if (!muteRole) return message.reply("** لا يوجد رتبة الميوت 'Muted' **").then(msg => {msg.delete(5000)});
      let time = messageArray[2];
      if(message.content.startsWith(prefix + "mute")) {
          if(!message.member.hasPermission('MUTE_MEMBERS')) return message.channel.send('**للأسف لا تمتلك صلاحية** **[ MUTE_MEMBERS ]**');
          if(!mutePerson) return message.channel.sendEmbed(muteembed)
          if(mutePerson === message.author) return message.channel.send('**لا يمكنك أن تعطي نفسك ميوت**');
          if(mutePerson === client.user) return message.channel.send('**لا يمكنك أن تعطي البوت ميوت:)**');
          if(message.guild.member(mutePerson).roles.has(muteRole.id)) return message.channel.send('**هذاالشخص ميوتد بالفعل**');
          if(!muteRole) return message.guild.createRole({ name: "Muted", permissions: [] });
          if(!time) return message.channel.send("**أكتب الوقت مثل:**`mt @user 30m-`");
          if(!time.match(/[1-60][s,m,h,d,w]/g)) return message.channel.send('**- خطأ في هذه المدة ربما لا يدعم البوت هذه المدة**');          
          message.guild.member(mutePerson).addRole(muteRole);
          message.channel.send(`** ${mutePerson} تم إسكاتك كتابيا ! :white_check_mark:  **`)         
          mutePerson.send(`**لقد تم إعطائك ميوت ${message.guild.name}**`)
          .then(() => { setTimeout(() => {
             message.guild.member(mutePerson).removeRole(muteRole); message.channel.send(` ${mutePerson} **إنتهى وقت الميوت** :white_check_mark:`);
         }, mmss(time));
    
      });
      }
  });

/////////////////////////////////  cv-ct  /////////////////////////////////

client.on('message', message => {
if (message.content.startsWith(prefix+"ct")) { message.delete();
if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply('<a:point:739164093952295013> **__You Dont Have Permission__**');
    var args = message.content.split(" ").slice(1);
    var argrst = args.join(' ');
       message.guild.createChannel(`${argrst}`, 'text')
       message.channel.send('`Creat Text Channel`**__Done__** <a:737739933132783708:738552171767005315>')
      }
});
client.on('message', message => {
if (message.content.startsWith(prefix+"cv")) { message.delete();
if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.reply('<a:point:739164093952295013> **__You Dont Have Permission__**');
    var args = message.content.split(" ").slice(1);
    var argrst = args.join(' ');
       message.guild.createChannel(`${argrst}`,'voice')      
       message.channel.send('`Creat Voice Channel` **__Done__** <a:737739933132783708:738552171767005315>')  
        }
});

/////////////////////////////////  mc-uc  /////////////////////////////////

client.on('message', message => {
var prefix = "/";
   if(message.content === prefix + "mc") {
   if(!message.channel.guild) return message.reply('** This command only for servers**');
   if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(' **__You Dont Have Permission__**');
   message.channel.overwritePermissions(message.guild.id, {
       SEND_MESSAGES: false
         }).then(() => {
     message.reply("**__Closed__** <a:737739967740248094:738561252456136716>")
     });
 }
   if(message.content === prefix + "uc") {
   if(!message.channel.guild) return message.reply('** This command only for servers**');
   if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('**__You Dont Have Permission__**');
       message.channel.overwritePermissions(message.guild.id, {
       SEND_MESSAGES: true
       }).then(() => {
    message.reply(" **__Opened__** <a:737739933132783708:738552171767005315>")
    });
 }    
});

/////////////////////////////////  hc - sc  /////////////////////////////////

client.on('message', message => {
var prefix = "/";
   if(message.content === prefix + "hc") {
   if(!message.channel.guild) return message.reply('** This command only for servers**');
   if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(' **__You Dont Have Permission__**');
   message.channel.overwritePermissions(message.guild.id, {
       READ_MESSAGES: false
         }).then(() => {
     message.reply("**__Chat Was Hidden__** <a:737739967740248094:738561252456136716>")
     });
 }
   if(message.content === prefix + "sc") {
   if(!message.channel.guild) return message.reply('** This command only for servers**');
   if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('**__You Dont Have Permission__**');
       message.channel.overwritePermissions(message.guild.id, {
       READ_MESSAGES: true
       }).then(() => {
    message.reply(" **__Chat Was Shown__** <a:737739933132783708:738552171767005315>")
    });
 }    
});

/////////////////////////////////  cr  /////////////////////////////////

client.on('message', msg => {
   let args = msg.content.split(" ").slice(1).join(" ")
if (msg.content.split(" ")[0].toLowerCase() === "/cr") {
   if(!args) return msg.channel.send('**أكتب `عدد` الألوان المراد إنشائها**'); 
  if (!msg.member.hasPermission('MANAGE_ROLES'))  return msg.reply('**__You Dont Have Permission__**');
   msg.channel.send(`**Created ${args} Colors** **__Done__** <a:737739933132783708:738552171767005315>`);
     setInterval(function(){})
       let count = 0;
       let ecount = 0;
  for(let x = 1; x < `${parseInt(args)+1}`; x++){
   msg.guild.createRole({name:x,
      color: 'RANDOM'})
        }
     }
});

/////////////////////////////////  clear  /////////////////////////////////

client.on('message', function(message) {
    if(!message.channel.guild) return;
    if (message.author.bot) return;
    if (message.author.id === client.user.id) return;
    if (message.author.equals(client.user)) return;
    if (!message.content.startsWith(prefix)) return;
    var args = message.content.substring(prefix.length).split(' ');
    switch (args[0].toLocaleLowerCase()) {
    case "clear" :
    message.delete()
    if(!message.channel.guild) return
    if(message.member.hasPermission(0x2000)){ if (!args[1]) {
    message.channel.fetchMessages()
    .then(messages => {
    message.channel.bulkDelete(messages);
    var messagesDeleted = messages.array().length;
    message.channel.sendMessage(' '+  messagesDeleted + " " +  '**__Done__** <a:737739933132783708:738552171767005315> ' + '**__Delete__** ' + " ").then(m => m.delete(5000));
    })
    } else {
    let messagecount = parseInt(args[1]);
    message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
    message.channel.sendMessage('**__Done__** <a:737739933132783708:738552171767005315> ' + '| **__Delete__** '+ args[1] + " **__Message__** ").then(m => m.delete(5000));
    message.delete(60000);
    }
    } else {
    var manage = new Discord.RichEmbed()
    .setDescription('**__You Do Not Have Permission__**')
    .setColor("RANDOM")
    message.channel.sendEmbed(manage)
    return;
   }
 }
});

/////////////////////////////////  Avatar  /////////////////////////////////

client.on("message", message => {
  if (message.content.startsWith("/avatar")) {
    if (message.author.bot || message.channel.type == "dm") return;
    var args = message.content.split(" ")[1];
    var avt = args || message.author.id;
    client
      .fetchUser(avt)
      .then(user => {
        avt = user;
        let avtEmbed = new Discord.RichEmbed()
          .setColor("#36393e")
          .setAuthor(`${avt.username}'s Avatar`, message.author.avatarURL)
          .setImage(avt.avatarURL)
          .setFooter(`BiiMO AVATAR.`, message.client.user.avatarURL);
        message.channel.send(avtEmbed);
      })
      .catch(() => message.channel.send(`Error`));
  } 
}); 

/////////////////////////////////  test  /////////////////////////////////

client.on("message", message => {
  if (message.content === "test") {
    let embed = new Discord.RichEmbed()
      .setAuthor(message.author.username)
      .setColor("#9B59B6")
      .addField(
        " ** :gear: **Server Support __BiiMO__** :gear: ",
        " https://discord.gg/CvXdKwC "
      );
    message.channel.sendEmbed(embed);
  }
});

client.on("message", message => {
  if (message.content === "test") {
    let embed = new Discord.RichEmbed()
      .setColor("#9B59B6")
      .setDescription(
        " **STATUS :** <:705835608379228258:738554426888945664> "     
      );
    message.channel.sendEmbed(embed);
  }
});

/////////////////////////////////  members  /////////////////////////////////

client.on('message', message => {
              if (!message.channel.guild) return;
      if(message.content =='/members')
      var kayan = new Discord.RichEmbed()
.setThumbnail(message.author.avatarURL)
.setFooter(message.author.username, message.author.avatarURL) 
.setTitle('<a:737739933132783708:738552171767005315>| **__Members Info__**')
.addBlankField(true)
.addField('<:705835608907579452:738933034560258089>| Online',`**__${message.guild.members.filter(m=>m.presence.status == 'online').size}__**`)
.addField('<:705835608173445221:738932478487691355>| Busy',`**__${message.guild.members.filter(m=>m.presence.status == 'dnd').size}__**`)
.addField('<:invisible:738554426888945664>| Invisible',`**__${message.guild.members.filter(m=>m.presence.status == 'idle').size}__**`)
.addField('<:Offline:738934826387636384>|Offline',`**__${message.guild.members.filter(m=>m.presence.status == 'offline').size}__**`)
.addField('👨‍👨‍👧‍👧| All Members',`**__${message.guild.memberCount}__**`)
      message.channel.send(kayan);
    });

/////////////////////////////////  user  /////////////////////////////////

client.on('message', message => {
var args = message.content.split(" ").slice(1);   
if(message.content.startsWith(prefix + 'user')) {
var year = message.author.createdAt.getFullYear()
var month = message.author.createdAt.getMonth()
var day = message.author.createdAt.getDate()
var men = message.mentions.users.first();  
let args = message.content.split(' ').slice(1).join(' ');
if (args == '') {
var z = message.author;
}else {
var z = message.mentions.users.first();
}
let d = z.createdAt;          
let n = d.toLocaleString(); 
let x;                      
let y;                        
if (z.presence.game !== null) {
y = `${z.presence.game.name}`;
} else {
y = "No Playing... |💤.";
}
if (z.bot) {
var w = 'بوت';
}else {
var w = 'عضو';
}
let embed = new Discord.RichEmbed()
.setColor("#502faf")
.addField('🔱| اسمك:',`**<@` + `${z.id}` + `>**`, true)
.addField('🛡| ايدي:', "**"+ `${z.id}` +"**",true)
.addField('♨| Playing:','**'+y+'**' , true)
.addField('🤖| نوع حسابك:',"**"+ w + "**",true)    
.addField('📛| الكود حق حسابك:',"**#" +  `${z.discriminator}**`,true)
.addField('**التاريح الذي انشئ فيه حسابك | 📆 **: ' ,year + "-"+ month +"-"+ day)    
.addField("**تاريخ دخولك للسيرفر| ⌚   :**", message.member.joinedAt.toLocaleString())    
.addField('**⌚ | تاريخ انشاء حسابك الكامل:**', message.author.createdAt.toLocaleString())
.addField("**اخر رسالة لك | 💬  :**", message.author.lastMessage)            
.setThumbnail(`${z.avatarURL}`)
.setFooter(message.author.username, message.author.avatarURL)
message.channel.send({embed});
  if (!message) return message.reply('**ضع المينشان بشكل صحيح  ❌ **').catch(console.error);
}
});

/////////////////////////////////  server  /////////////////////////////////

client.on('message', message => {
    if (message.content === "/server") {
        if (!message.channel.guild) return/// </>~M̲e Ȼodes ᶜ
        var verificationLevel = message.guild.verificationLevel;
        const verificationLevels = ['None','Low','Meduim','High','Extreme'];/// </>~M̲e Ȼodes ᶜ
        var Y1 = message.guild.createdAt.getFullYear() - 2000/// </>~M̲e Ȼodes ᶜ
        var M2 = message.guild.createdAt.getMonth()/// </>~M̲e Ȼodes ᶜ
        var D3 = message.guild.createdAt.getDate()/// </>~M̲e Ȼodes ᶜ
        const xNiTRoZ = new Discord.RichEmbed()
         .setAuthor(message.author.username , message.author.avatarURL)/// </>~M̲e Ȼodes ᶜ
         .setColor('RANDOM')/// </>~M̲e Ȼodes ᶜ
         .setTimestamp()/// </>~M̲e Ȼodes ᶜ
         .setTitle(message.guild.name,message.guild.iconURL)
         .addField(':id: اي دي السيرفر',`${message.guild.id}`,true)/// </>~M̲e Ȼodes ᶜ
         .addField(':date: أنشئت في',D3 + '.' + M2 + '.' + Y1,true) /// </>~M̲e Ȼodes ᶜ            
         .addField(':crown: اونر السيرفر',`${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`)             
         .addField(':busts_in_silhouette: الاعضاء ' + ` ${message.guild.memberCount} `,'Online '+`[ ${message.guild.members.filter(m=>m.presence.status == 'online','idle','dnd').size} ]`+ ','+'Offline '+`[ ${message.guild.members.filter(m=>m.presence.status == 'offline').size} ]`,true)
         .addField(':speech_balloon: قنوات' +' '+message.guild.channels.size+' ',`Text [ ${message.guild.channels.filter(m => m.type === 'text').size} ]`+', '+`Voice [ ${message.guild.channels.filter(m => m.type === 'voice').size} ]`,true)
         .addField(':earth_asia: الدوله',message.guild.region)
         .addField(':ribbon: ايموجي السيرفر',`${message.guild.emojis.size}`,true)
         .addField(':construction: مستوى التحقق',`${verificationLevels[message.guild.verificationLevel]}`,true)
         .addField(':closed_lock_with_key: الرتب  '+message.guild.roles.size+' ','Type -help !')
         message.channel.send({embed:xNiTRoZ});
     }
    });

/////////////////////////////////  invite  /////////////////////////////////

client.on("message", message => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + "inv")) {
    if (message.author.id == message.guild.ownerID) {
      message.author
        .send(
          ` <:emoji_57:738043240804122664> **__BiiMO Bot Link :__**
https://discordapp.com/oauth2/authorize?client_id=657963156982726656&permissions=8&scope=bot`
        )
        .then(() => {
          message.author.send(
         ` <:emoji_57:738043240804122664> **__BiiMO Bot Support :__**
https://discord.gg/CvXdKwC
`);
        })
        .then(e => {
          message.react("✅");
        })
        .catch(() => {
          return message.channel
            .send(
              "**يجب السماح بأستقبال الرسائل في الخاص ، لأتمكن من ارسال الاوامر لك **"
            )
            .then(() => {
              return message.react("❌");
            });
        });
    }
  }
});

/////////////////////////////////  Antibots  /////////////////////////////////

let antibots = JSON.parse(fs.readFileSync('./antibots.json' , 'utf8'));//require antihack.json file
  client.on('message', message => {
      if(message.content.startsWith(prefix + "antibots on")) {
          if(!message.channel.guild) return;
          if(!message.member.hasPermission('ADMINISTRATOR')) return;
  antibots[message.guild.id] = {
  onoff: 'On',
  }
  message.channel.send(`**AntiBots Join Is __ON__** <a:737739933132783708:738552171767005315>`)
            fs.writeFile("./antibots.json", JSON.stringify(antibots), (err) => {
              if (err) console.error(err)
              .catch(err => {
                console.error(err);
            });
              });
            }
          })
  client.on('message', message => {
    if(message.content.startsWith(prefix + "antibots off")) {
          if(!message.channel.guild) return;
          if(!message.member.hasPermission('ADMINISTRATOR')) return;
  antibots[message.guild.id] = {
  onoff: 'Off',
  }
  message.channel.send(`**AntiBots Join Is __OFF__** <a:737739967740248094:738561252456136716>`)
            fs.writeFile("./antibots.json", JSON.stringify(antibots), (err) => {
              if (err) console.error(err)
              .catch(err => {
                console.error(err);
            });
              });
            }
          })
  client.on("guildMemberAdd", member => {
    if(!antibots[member.guild.id]) antibots[member.guild.id] = {
  onoff: 'Off'
  }
    if(antibots[member.guild.id].onoff === 'Off') return;
  if(member.user.bot) return member.kick()
  })
  fs.writeFile("./antibots.json", JSON.stringify(antibots), (err) => {
  if (err) console.error(err)
  .catch(err => {
  console.error(err);
  });
  })

/////////////////////////////////  ban  /////////////////////////////////

client.on("message", message => {
  if (message.author.codes) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);
  let args = message.content.split(" ").slice(1);
  if (command == "ban") {
    if (message.author.bot) return;
    if (!message.channel.guild)
      return message.reply("** This command only for servers**");
    if (!message.guild.member(message.author).hasPermission("BAN_MEMBERS"))
      return message.reply("**انت لا تملك الصلاحيات المطلوبه**");
    if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS"))
      return message.reply("**I Don't Have ` BAN_MEMBERS ` Permission**");
    let user = message.mentions.users.first();
    if (message.mentions.users.size < 1) return message.reply("**منشن شخص**");
    if (
      message.mentions.members.first().highestRole.position >=
      message.member.highestRole.position
    )
      return message.channel.send("ما تقدر تبند شخص رتبته اعلى منك!");
    if (!message.guild.member(user).bannable)
      return message.reply(
        "**يجب ان تكون رتبة البوت اعلي من رتبه الشخص المراد تبنيدة**"
      );
    message.guild.member(user).ban(7, user);
    message.channel.send(
      `**:white_check_mark: ${user.tag} banned from the server ! :airplane: **  `
    );
  }
});

/////////////////////////////////  Unban  /////////////////////////////////

client.on('message' , message => {
    ;
    let user = message.mentions.users.first()|| client.users.get(message.content.split(' ')[1])
    if(message.content.startsWith(prefix + 'unban')) {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('**أنت لا تملك صلاحية**  **[ ADMINISTRATOR ]** :x: ');
        if(!user) return  message.channel.send(`Do this ${prefix} <@ID user> \n or \n ${prefix}unban ID user`);
        message.guild.unban(user);
        message.guild.owner.send(` <a:732093457467703456:739114953528573993> **__Removed ban From The member__ :** \n ${user} \n **__By__ :** <@${message.author.id}>`)
        var embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle('**__Unban Done__** ')
        .addField('**__User UnBan__:** ', `${user}` , true)
        .addField('**__By__ :**' , ` <@${message.author.id}> ` , true)
        .setAuthor(message.guild.name)
        message.channel.sendEmbed(embed)
    }
});

/////////////////////////////////  Kick  /////////////////////////////////

client.on("message", message => {
  if (message.author.x5bz) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);
  let args = message.content.split(" ").slice(1);
  if (command == "kick") {
    if (message.author.bot) return;
    if (!message.channel.guild)
      return message.reply("**This command only for servers**");
    if (!message.guild.member(message.author).hasPermission("KICK_MEMBERS"))
      return message.reply("**You Don't Have ` KICK_MEMBERS ` Permission**");
    if (!message.guild.member(client.user).hasPermission("KICK_MEMBERS"))
      return message.reply("**I Don't Have ` KICK_MEMBERS ` Permission**");
    let user = message.mentions.users.first();
    let reason = message.content
      .split(" ")
      .slice(2)
      .join(" ");
    if (message.mentions.users.size < 1) return message.reply("**`Mention User`**");
    if (!reason) return message.reply("**__Reason For Kick__**");
    if (!message.guild.member(user).kickable)
      return message.reply(
        "**__لايمكن طرد شخص أعلى من رتبت __البوت**"
      );
    if (
      message.mentions.members.first().highestRole.position >=
      message.member.highestRole.position
    )
      return message.channel.send("**لا يمكنك طرد شخص أعلى من رتبتك**");
    message.guild.member(user).kick();
    const kickembed = new Discord.RichEmbed()
      .setAuthor(`KICKED!`, user.displayAvatarURL)
      .setColor("RANDOM")
      .setTimestamp()
      .addField("**User:**", "**[ " + `${user.tag}` + " ]**")
      .addField("**By:**", "**[ " + `${message.author.tag}` + " ]**")
      .addField("**Reason:**", "**[ " + `${reason}` + " ]**");
    message.channel.send({
      embed: kickembed
    });
  }
});

/////////////////////////////////  link  /////////////////////////////////

client.on('message', message => {
    if (message.content.startsWith("/link")) {
  message.channel.createInvite({
        thing: true,
        maxUses: 50,
        maxAge: 86400
    }).then(invite =>
      message.author.sendMessage(invite.url)
    )
  message.channel.send("**:link:.تم إرسال الرابط برسالة خاصة**")
message.author.send(`**مدة الرابط : يـوم
عدد استخدامات الرابط : 50**`)
    }
});
/////////////////////////////////  welcome  /////////////////////////////////

client.on("guildMemberAdd", member => {
  let id = member.user.id;
  let m = member.user;
  var embed = new Discord.RichEmbed()
    .setThumbnail(m.avatarURL)
    .setImage(
      "https://media.discordapp.net/attachments/713273672529477642/738891778631139338/tumblr_lqjmvhCBbd1qd84n8o1_500.gif"
    )
    .addField(` <a:735236656071966800:738897361081729144> **__Welcome To Server__ :**`,

     `**__UserName :__** : <@${id}>`  
  )
    .addField("**__Server :__**",`**${member.guild.name}**`)    
    .addField("**__Users :__** ",`${member.guild.memberCount} `)
    .setColor("RANDOM");
  var channel = member.guild.channels.find("name", "welcome"); //تعديل مهم اسم روم الولكم
  if (!channel) return;
  channel.send({ embed: embed });
});

/////////////////////////////////  allbots  /////////////////////////////////

  client.on('message', message => {
     if(!message.channel.guild) return;
var prefix = "/";
                if(message.content.startsWith(prefix + 'allbots')) {    
    if (message.author.bot) return;
    let i = 1;
        const botssize = message.guild.members.filter(m=>m.user.bot).map(m=>`${i++} - <@${m.id}>`);
          const embed = new Discord.RichEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL)
          .setDescription(` <:emoji_10:738673977886769163> **${message.guild.members.filter(m=>m.user.bot).size}** **__Bots In This Server__**
${botssize.join('\n')}`)
.setFooter(client.user.username, client.user.avatarURL)
.setTimestamp();
message.channel.send(embed)
}
});

/////////////////////////////////  infrole  /////////////////////////////////

  client.on('message',async message => {
  let args = message.content.split(" ").slice(1).join(" ");
  let role = message.guild.roles.find('name',args) || message.guild.roles.get(args);

  if(message.content.startsWith(prefix + "infrole")) {
    if(!args) return message.reply('**أكتب إسم الرتبة كما هي**');
    if(!role) return message.reply('**هذه الرتبة غير موجودة**');
    let iQp = new Discord.RichEmbed()
    .setAuthor(message.author.tag,message.author.avatarURL)
    .setTitle(message.guild.name)
    .setThumbnail(message.guild.iconURL)
    .addField('-**`إسم الرتبة`**',role.name,true)
    .addField('-**`أيدي الرتبة`**',role.id,true)
    .addField('-**`تم انشاء الرتبة`**',role.createdAt.toLocaleString(),true)
    .addField('-**`لون الرتبة`**',role.hexColor,true)
    .addField('-**`عددالأعضاءالمالكين للرتبة`**',role.members.size,true)
    .addField('-**`مركز الرتبة`**',role.position - message.guild.roles.size,true)
    .addField('-**`خصائص الرتبة`**',role.permissions,true)
    .setFooter(message.author.tag,message.author.avatarURL);
    message.channel.send(iQp);
  }
}); 

///////////////////////////////  anti links  ///////////////////////////////

client.on('message', message => {
    if(message.content.includes('discord.gg')){ message.delete()
         if(!message.channel.guild) return message.reply('**advertising me on DM ? 🤔**');
        if (!message.member.hasPermissions(['ADMINISTRATOR'])){
        message.delete()
        message.delete()
    return message.reply(`**Don't Post __Link__ !** <a:732093457467703456:739114953528573993> `)
    }
}
});

/////////////////////////////////  botinv  /////////////////////////////////

client.on('message', msg => {
    if(msg.content.startsWith('/binv')) {
    if(msg.channel.type === 'dm') return;
const user = msg.mentions.users.first();
if(!user) return msg.channel.send(' **`قم بتحديد بوت`** ')
if(!user.bot) return msg.reply('`منشن بوت`');
msg.channel.send(`**Bot InviteURL : ** https://discordapp.com/oauth2/authorize?client_id=${user.id}&scope=bot&permissions=384064`)
    }
});

/////////////////////////////////    /////////////////////////////////

client.on('message', message=> {
    if (message.author.bot) return;
    if (message.isMentioned(client.user))
    {
    message.reply("<:46574:739188732858597417> **__For Show Commands__ <a:98754:739189926733545523> `/help` | __For Invite Bot__ <a:98754:739189926733545523> `/inv` **")
    }
});

/////////////////////////////////    /////////////////////////////////

client.on('message', message => {
   if(message.content.includes('discord.gg/')) { message.delete();
   if(message.member.hasPermission('ADMINISTRATOR')) return;
  message.delete();
  message.delete();
  message.guild.member(message.author).addRole(message.guild.roles.find(r => r.name === 'Muted'));
   let embedP = new Discord.RichEmbed()
      .setTitle('<a:737739967740248094:738561252456136716> | You Have Been Muted ')
      .setAuthor(message.author.username, message.author.avatarURL)
      .setColor('RANDOM')
      .setThumbnail(message.author.avatarURL)
      .setFooter(`${message.guild.name} Server`, message.guild.iconURL)        
     message.channel.send(embedP);
    }
});

/////////////////////////////////  Savatar  /////////////////////////////////

client.on("message", message => {
   const prefix = "/"              
      if(!message.channel.guild) return;
      if(message.author.bot) return;
      if(message.content === prefix + "savatar"){
  const embed = new Discord.RichEmbed()
    .setTitle(`**ServerAvatar** : ${message.guild.name} `)
    .setAuthor(message.author.username, message.guild.iconrURL)
    .setColor(0x164fe3)
    .setImage(message.guild.iconURL)
    .setURL(message.guild.iconrURL)
    .setTimestamp()
   message.channel.send({embed});
      }
  });

/////////////////////////////////  bans  /////////////////////////////////

 client.on('message', message => {
    if (message.content.startsWith("/bans")) {
        message.guild.fetchBans()
        .then(bans => message.channel.send(`**__Number Of Members Baned__ :** <:2153:739199288235786412> ${bans.size} `))
  .catch(console.error);
}
});

/////////////////////////////////  perms  /////////////////////////////////

client.on('message', message => {
  var prefix ="/";
if (message.content.startsWith(prefix + 'perms')) {
  if(!message.channel.guild) return;
  var perms = JSON.stringify(message.channel.permissionsFor(message.author).serialize(), null, 4);
     var zPeRms = new Discord.RichEmbed()
     .setColor('RANDOM')
     .setTitle('<a:fds65:739200972777324685> **__Permissions__**')
     .addField('<:46574:739188732858597417>   __Your Permissions__ :',perms)
      message.channel.send({embed:zPeRms});
    }
});

/////////////////////////////////    /////////////////////////////////

client.on('message', message => {
  if (message.content === "/rooms") {
var channels = message.guild.channels.map(channels => `${channels.name},
`).join(' ')
   const embed = new Discord.RichEmbed()
 .setColor('RANDOM')
 .addField(':dvd: **__All Rooms__**',`**${channels}**`)
  message.channel.sendEmbed(embed);
    }
});

///////////////////////////////  Send prv msg  ///////////////////////////////

const perfix = '#';
client.on('message', msg => {
 if (msg.content.startsWith(prefix + 'prvmsg')) {
if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply(' **__You Dont Have Permission__**');
      let args = msg.content.split(' ').slice(1)
      if (!args[0]) return msg.reply(`**منشن الشخص أولا**`)
      if (!args[1]) return msg.reply(`**ما هي الرسالة المطلوب إرسالها**`)
      let alpha = msg.mentions.members.first()
      if (!alpha) return msg.reply(`**يجب تحديد الشخص**`)
      let alphaEmbed = new Discord.RichEmbed()
      .setTitle(`**رسالة جديدة لك من صاحب البوت**`)
      .setDescription(args.join(" "))
      client.users.get(`${alpha.id}`).send(alphaEmbed)
      msg.reply(`**تم إرسال الرسالة**`)
    }
});

///////////////////////////////  tnx for inv  ///////////////////////////////

client.on('guildCreate', guild => {
  var embed = new Discord.RichEmbed()
  .setColor(0x5500ff)
  .setDescription(`
  **شكرا لك لإضافة البوت إلى سيرفرك**

    ** __لازم إنشاء الرومات التالية__**

   **welcome** => يقوم البوت بالترحيب هنا
   **leave**  =>يقوم البوت بالتوديع هنا   
   **submissions** => (روم مخفية)لتلقي طلبات الأعضاء
   **suggestions**  =>  (روم مخفية)لتلقي إقتراحات الأعضاء

  **سيرفر الدعم الفني**
  https://discord.gg/wW4eqXA
`)
      guild.owner.send(embed)
});

/////////////////////////////////    /////////////////////////////////

client.on("guildMemberAdd", member => {
  member.createDM().then(function (channel) {
  return channel.send(` 
**مرحبا بك في السيرفر**  :rose:

**إسم العضو:**  ${member} :crown:  

**أنت العضو رقم:** ${member.guild.memberCount} 
**سيرفر الدعم الفني**
https://discord.gg/wW4eqXA `) 
}).catch(console.error)
})

////////////////////////////////////////////////////////////////////////////

client.login("NjU3OTYzMTU2OTgyNzI2NjU2.Xf418A.lVSAFH6outZDU85SnAo2sVo2cbg");
