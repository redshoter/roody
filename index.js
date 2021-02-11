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


client.on("message", msg => {
  if (msg.content.startsWith(prefix + "comandos")) {
    msg.channel.send("`-----COMANDOS DE AYUDA----- =help =comandos -----COMANDOS DE DIVERSION----- UwU -----COMANDOS DE MODERACION----- =ban (@ del ususario + razon)`")
}
});

client.on("message", msg => {
  if (msg.content.startsWith(prefix + "help")) {
    msg.channel.send("Con este bot puedes hacer muchas funciones, puedes ver toda la lista de ellas aqui")
}
});


client.on("message", msg => {
  if (msg.content.startsWith("UwU")) {
    msg.channel.send(":flushed: UwU :flushed:")
}
});


const ms = require("ms") // Requieres el modulo ms.
time = "1h"
setTimeout(async function()  {
console.log("=tempmute")
}, ms(time))

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


const MusicBot = require('discord-music-system-es'); // requerimos el paquete de música

const bot = new MusicBot({
    botPrefix: '=', // 
    ytApiKey: 'AIzaSyDHsSNuTyniRB1ThcuMz2c17bZUJbdTUvw', 
    botClient: client 
});

client.login(''); //aqui ponemos el TOKEN de nuestro bot 



client.login(process.env.TOKEN);
