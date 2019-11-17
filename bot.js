const Discord = require('discord.js');
const discordclient = new Discord.Client();
const { AkairoClient } = require('discord-akairo');
const client = new AkairoClient({
    ownerID: ['257825765528174593'],
    prefix: '.',
    allowMention: true,
    defaultCooldown: 1000,
    commandDirectory: './commands/',
    inhibitorDirectory: './inhibitors/',
    listenerDirectory: './listeners/'
}, {
    disableEveryone: true
});

client.login('');
