const express = require('express');
const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Novo ping em: ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT); 

const Discord = require("discord.js"); 
const client = new Discord.Client(); 
const config = require("./config.json");
const Aoijs = require("aoi.js")

const bot = new Aoijs.Bot({
token: config.token, //Discord bot Token
prefix: `${config.prefix}` //Customizable
})

bot.onMessage() //Allows to run Commands

bot.command({
name: "setstatus",
code: `$setStatus[$message;LISTENING;online] <a:correto:847139293859282974> My statuses have been changed to: "**$message**"

$onlyForIDs[627572200693563398;Only my developer can use this command]`
})

bot.command({
name: "setbotavatar",
code: `Set the bots avatar! 
$setBotAvatar[$message]`
})

bot.command({
name: "setbotname",
code: `Set the bots name! 
$setBotName[$message]`
})

bot.command({
name: "play",
code: `$playSong[$message]`
})

bot.command({
name: "p",
code: `$playSong[$message]`
})

bot.command({
name: "cpu",
code: `CPU Usage: $cpu`
})

bot.command({
name: "volume",
code: `
$volume[$message]

Volume has been set to: $message`
})

bot.command({
name: "queue",
code: `$queue[1;10;{number} - {title} by <@{userID}>]`
})

bot.command({
name:"pause",
code:`$pauseSong`
})

bot.command({
name:"stop",
code:`$pauseSong`
})

bot.command({
name:"resume",
code: `$resumeSong`
})

bot.command({
name:"skip",
code:`$skipSong`
})

bot.command({
    name: "loop-song",
    code: `
    Looping current song.
    $loopSong
    `
})

bot.command({
    name: "loop",
    code: `
    Looping current song.
    $loopSong
    `
})

client.login(config.token);

client.on("ready", () => {
  let activities = [
      `🎶 Eu sou um bot de música`,
      `?help`
    ],
    i = 0;
  setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
        type: "STREAMING"
      }), 1000 * 60); 
  client.user
      .setStatus("online")
      .catch(console.error);
console.log("Estou Online!")
});

client.on("message", message => {
    if (message.author.bot) return;
    if (message.channel.type == 'ferinha')
    return
    if(message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`) {
    return message.channel.send(`🔮 | Olá ${message.author}, me chamo Meliodas
➪ meu invite https://discord.com/oauth2/authorize?client_id=861949166962868286&permissions=8&scope=bot
➪ meu prefix e  ** ${config.prefix}**
➪ Link Do Meu Servidor: [Clique aqui!](https://discord.gg/aHU9BM9Mnp)`)
    }
    }); 

client.on('message', message => {
     if (message.author.bot) return;
     if (message.channel.type == 'dm') return;
     if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
     if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

    const args = message.content
        .trim().slice(config.prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        const commandFile = require(`./commands/${command}.js`)
        commandFile.run(client, message, args);
    } catch (err)  {}
});