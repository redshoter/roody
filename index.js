const Discord = require("discord.js");
const client = new Discord.Client();
require('dotenv').config();

const keepAlive = require('./server');
const Monitor = require('ping-monitor');
 
keepAlive();
const monitor = new Monitor({
    website: 'https://Roody-2.redshoters.repl.co',
    title: 'Secundario',
    interval: 15 // minutes
});


client.on("ready", () => {
   console.log("ESTE BOT FUNCIONA"); 
});

//////////////////////////MONITOR///////////////////////////

monitor.on('up', (res) => console.log(`${res.website} está encedido.`));
monitor.on('down', (res) => console.log(`${res.website} se ha caído - ${res.statusMessage}`));
monitor.on('stop', (website) => console.log(`${website} se ha parado.`) );
monitor.on('error', (error) => console.log(error));


//////////////////////////BOT REAL//////////////////////

var prefix = "="

function presence(){
   client.user.setPresence({
      status: "online",
      activity: {
         name: "viendo 11 servers |=help",
         type: "PLAYING"
      }
   });
}

client.on("ready", () => {
    console.log("bot listo!");
    presence();
 });

client.on("message", msg => {
  if (msg.content.startsWith(prefix + "comandos")) {
    msg.channel.send("`= (prefix) \n\n -------COMANDOS DE ROODY---------` \n \n `=help =comandos =pagina =instagram =discord` \n \n `-----COMANDOS DE DIVERSION------` \n \n `redshoter =meme =avatar =serverinfo UwU ` \n \n `-----COMANDOS DE MODERACION-----`  \n \n `=ban (@ del ususario + razon) =clear`")
}
});


client.on("message", msg => {
const embed = new Discord.MessageEmbed()
  .setTitle("SERVER INFO:")
  .setThumbnail(msg.guild.iconURL())
  .setColor("RANDOM")
  .addFields(
    {name: ":keyboard: Canales", value: msg.guild.channels.cache.size, inline: true},
    {name: ":person_red_hair: Miembros", value: msg.guild.memberCount, inline: true},
    {name: ":book:Numero de roles", value: msg.guild.roles.cache.size, inline: true},
    {name: "Roles", value: msg.guild.roles.cache.map(r => `${r}`).join(" | "), inline: true},
    {name: ":id: ID del server", value: msg.guild.id},
    {name: ":map: Region", value: msg.guild.region, inline: true}
  )
  if(msg.content.startsWith("=serverinfo")){
    msg.reply(embed)
  }
}) 


client.on("message", message => {
  if(message.author.bot || message.channel.type === "dm") return;
  
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  
  
  if(cmd === prefix + 'clear'){
    if (message.deletable) {
      message.delete();
    }
    
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.reply("No Tienes Permisos para Hacer esto").then(m => m.delete(5000));
    }
    
    if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
      return message.reply("Porfavor Proporciona Un Numero del 1 al 100").then(m => m.delete(5000));
    }
    
    let deleteAmount;
    if (parseInt(args[0]) > 100) {
      deleteAmount = 100;
    }  else {
      deleteAmount = parseInt(args[0]);
    }
    
    message.channel.bulkDelete(deleteAmount, true)
    .catch(err => message.reply(`Ocurrió un error ${err}`));
  }
})

const got = require('got');
client.on("message" , msg => {
  if(msg.content.startsWith("=meme")){
const embed = new Discord.MessageEmbed()
   got("https://www.reddit.com/r/memes/random/.json").then(Response => {
        let content = JSON.parse(Response.body);
        let memeimage = content[0].data.children[0].data.url;
        let memetitle = content[0].data.children[0].data.title;
        let memeLikes = content[0].data.children[0].data.ups;
        embed.setTitle(``)
        embed.setImage(memeimage)
        embed.setColor("RANDOM")
        //"https://www.reddit.com/r/memes/random/.json"
     msg.channel.send(embed)
    });

  } 
});


  client.on("message", msg => {
  let user = msg.mentions.users.first()
  if(!user) user = msg.author;
if (msg.content.startsWith(prefix + "avatar")) {
  const embed = new Discord.MessageEmbed()
  .setTitle("este es el avatar que buscas")
  .setImage(user.displayAvatarURL())
  .setColor("RANDOM")
  .setTimestamp()
  msg.reply(embed)
  }
});

client.on("message", msg => {
  if (msg.content.startsWith(prefix + "help")) {
    msg.channel.send("***:tools: EN PROCESO :tools: ***")
}
});


client.on("message", msg => {
  if (msg.content.startsWith(prefix + "pagina")) {
    msg.channel.send("***:tools: TERMINANDOLA :tools: ***")
}
});


client.on("message", msg => {
  if (msg.content.startsWith("UwU")) {
    msg.channel.send(":flushed: UwU :flushed:")
}
});


client.on("message", msg => {
  if (msg.content.startsWith("redshoter")) {
    msg.channel.send("quien a mencionado a mi creador? si hablais, que sea bien de el :relieved:")
}
});


client.on("message", msg => {
  if (msg.content.startsWith(prefix + "instagram")) {
    msg.channel.send("**Si me quieres seguir en instagram, entra aqui :) https://www.instagram.com/bot.roody/**")
  }
});


client.on("message", msg => {
  if (msg.content.startsWith(prefix + "discord")) {
    msg.channel.send("**Este es el discord de Roody: https://discord.gg/5Ha2D33hbA :)**")
  }
});


client.on("message", async(message) => {
if(message.author.bot) return;
if(!message.content.startsWith(prefix)) return;


var args = message.content.slice(prefix.length).trim().split(/ +/g)
var command = args.shift().toLowerCase()


if(command === "ban"){
 if(!message.member.permissions.has('BAN_MEMBERS')) return message.channel.send(":x: | ¡No tienes permisos para hacer esto!");


let member = message.mentions.members.first();
if(!member) return message.channel.send(":x: | Necesitas mencionar un usuario")
if(!member.bannable) return message.channel.send(":x: | No puedes banear a ese usuario\n \n· Porque él / ella tiene el **mismo rol** o es **superior a tu rol**")


if(message.guild.owner.id !== message.author.id && member.roles.highest.comparePositionTo(message.member.roles.highest) >= 0) return message.channel.send(":x: | No puedes banear a ese usuario\n \n· Porque él o ella tiene el **mismo rol** o tiene un rol **superior a tu rol**");


if(member.id === message.author.id) return message.channel.send(":x: | ¡No puedes banearte a ti mismo!")


if(member.id === client.user.id) return message.channel.send(":x: | No puedes Banearme 😔")


let reason = args[1] ? args.slice(1).join(' ') : ':x: | No especificado'


await member.ban({ reason }).catch(error => message.channel.send(`:x: | No puedo banear a ese usuario\n \nError: **${error}**`));


let uban = message.mentions.members.first() || message.guild.members.get(args[0])


var embed = new Discord.MessageEmbed()
   .setAuthor(client.user.username, client.user.avatarURL())
   .setColor("0x5b00ff")
   .addField("Autor", message.author.username)
   .addField("Usuario", member.user.username)
   .addField("Razon", reason)
    message.channel.send(embeon)
}
})


client.login(process.env.TOKEN);
