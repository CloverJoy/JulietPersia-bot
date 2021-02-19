const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.static('public'));
const Discord = require('discord.js');
// const { prefix, token } = require('./config.json');
require('dotenv').config();
const prefix = '~';
const port = process.env.PORT || 80;

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Jurieto Perushiaa desu!');
	client.user.setActivity('~btc', { type: 'LISTENING' });
});


client.on('message', message => {
	// kalo di mention
	if (message.content.includes('<@!802744454107758624>')) {
		if (message.author.username === 'CloverJoy') {
			message.reply(' iyaa sayang?? <3<3');
			return;
		}
		message.reply(' ?');
	}
	// End of troll only
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName);
	if (command.args && !args.length) {
		return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
	}

	try {
		command.execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});


client.login(process.env.JULIET_TOKEN);
app.listen(port, () => {
	console.log(`Juliet Persia is listening at http://localhost:${port}`);
});