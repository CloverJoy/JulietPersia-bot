const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const helpEmbed = new Discord.MessageEmbed()
	.setColor('#7fffd4')
	.setTitle('Hi there! I\'m Juliet Persia! Nice to meet you!')
	.setAuthor('Juliet Persia', 'https://cdn.anisearch.com/images/character/cover/full/69/69174.jpg')
	.setImage('https://i.ytimg.com/vi/A5pchbPE2Rc/maxresdefault.jpg')
	.setDescription('So you need help? Here is my help :D.')
	.addFields(
		{ name: 'Current command available', value: 'ver 0.0.1' },
		{ name: 'Hello!', value: 'type ~hello', inline: true },
		{ name: 'Introduction', value: 'type ~whoareyou', inline: true },
		{ name: 'Help', value: 'type ~help', inline: true },
	);


client.once('ready', () => {
	console.log('HI, My nane is Julieto Perusiaa');
});

client.on('ready', () => {
	client.user.setActivity('with your mom', { type: 'PLAYING' });
});


client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	if (message.content === `${prefix}hello`) {
		message.channel.send(`Hi there, ${message.author.username}! :D`);
	}
	else if (command === 'args-info') {
		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}
		message.channel.send(`Command name: ${command}\nArguments: ${args}`);
	}
	else if (command === 'whoareyou') {
		message.channel.send('istri nya cloverjoy');
	}
	else if (command === 'help') {
		message.channel.send(helpEmbed);
	}
	else if (command === 'dots') {
		message.channel.send('@here DOTS??');
	}
});


client.login(token);