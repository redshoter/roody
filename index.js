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


const MusicBot = require('discord-music-system-es'); // requerimos el paquete de música

const bot = new MusicBot({
    botPrefix: '=', // Ejemplo: !
    ytApiKey: 'AIzaSyDHsSNuTyniRB1ThcuMz2c17bZUJbdTUvw', // Video de como obtener tu API KEY: https://www.youtube.com/watch?v=VqML5F8hcRQ
    botClient: client //Tu cliente de Discord. Aquí estamos usando discord.js, por lo que es Discord.Client ()
});

client.on('message', message => { // Cuando un el bot recive un mensaje
    if(message.content.startsWith(bot.prefix)){ // Si el mensaje empieza con su prefijo
        bot.onMessage(message); // discord-music-system lee si es un comando de música o no
    };
});

client.login('ODA1MTg1OTE3MjA2NzkwMTU0.YBXN0g.8c8yNeLJNi9wnoeVkejI06XROQI'); // Aqui ponemos el token de nuestro bot, obtenlo creando una aplicación en https://discord.com/developers/applications/


client.login(process.env.TOKEN);
