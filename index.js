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
	console.log('Jurieto Perushiaa desu!');
	client.user.setActivity('you :)', { type: 'LISTENING' });
});

client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	// Join the same voice channel of the author of the message
	if (message.member.voice.channel && command === 'vc') {
		const connection = await message.member.voice.channel.join();
		const dispatcher = connection.play('price.mp3');

		dispatcher.on('start', () => {
			console.log('audio.mp3 is now playing!');
		});

		dispatcher.on('finish', () => {
			console.log('audio.mp3 has finished playing!');
			connection.disconnect();
			message.channel.send('bye!')
		});

		dispatcher.on('error', console.error);
	}
	// makes bot to leave voice channel when user is in channel. 
	if (message.content.startsWith(prefix + 'leave')) {
		if (!message.guild.voice) {
			message.reply('Im not in the channel sir');
		} else {
			message.guild.voice.channel.leave()
			console.log(message.guild.voice.channel);
		}
	  }
});



client.on('message',  message => {
	// Cuma buat ngetroll channel sendiri lol
	if (message.content.toLowerCase().includes('dots?') || message.content.toLowerCase().includes('apex?') || message.content.toLowerCase().includes('play') && message.content.toLowerCase().includes('?')
	|| message.content.toLowerCase().includes('@here') && message.content.toLowerCase().includes('play') || message.content.toLowerCase().includes('@everyone') && message.content.toLowerCase().includes('play')) {
		message.reply('Hezki pass dulu, lagi bootcamp')
		console.log('Ada yang ngajak main dots tuh'); 
	}
	//kalo di mention
	if (message.content.includes('<@!802744454107758624>')) {
		if (message.author.username === 'CloverJoy') {
			message.reply(' iyaa sayang?? <3<3')
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
	} catch (error) {
	console.error(error);
	message.reply('there was an error trying to execute that command!');
	}
});


client.login(token);