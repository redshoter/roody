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
  if (msg.content.startsWith("hola")) {
    msg.channel.send("Hola, soy el bot de @redshoter si tienes alguna duda puedes poner =help :slight_smile:")
    }
    });

client.on("message", msg => {
  if (msg.content.startsWith(prefix + "help")) {
    msg.channel.send("Con este bot puedes hacer muchas funciones, puedes ver toda la lista de ellas aqui ")
}
});




client.login(process.env.TOKEN);
