const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const { connect } = require('http2');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('HI, My nane is Julieto Perusiaa');
	client.user.setActivity('Type ~help', { type: 'PLAYING' });
});

client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	// Join the same voice channel of the author of the message
	if (message.member.voice.channel && command === 'vc') {
		const connection = await message.member.voice.channel.join();
		connection.disconnect();
	}
});



client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;
	
	try {
	client.commands.get(command).execute(message, args);
	} catch (error) {
	console.error(error);
	message.reply('there was an error trying to execute that command!');
	}
});


client.login(token);