const Discord = require('discord.js');
const prefix = process.env.PREFIX;
require('dotenv').config();
const client = new Discord.Client();

const fs = require('fs');
client.commands = new Discord.Collection();

const cmdFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const f of cmdFiles){
    const com = require(`./commands/${f}`);
    client.commands.set(com.name, com);
}

client.once('ready',()=>{//login -> node .
    console.log('Your client is now online!');
});

client.on('message', message=>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'author'){
       client.commands.get('author').execute(message,args);
    }else if(command === 'play'){
        client.commands.get('play').execute(message,args);
    }else if(command === 'leave'){
        client.commands.get('leave').execute(message,args);
    }
});






client.login(process.env.BOT_TOKEN);


