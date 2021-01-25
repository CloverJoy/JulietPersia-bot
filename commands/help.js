const Discord = require('discord.js');
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

module.exports = {
	name: 'help',
	description: 'Help embed command',
	execute(message, args) {
		message.channel.send(helpEmbed);
	},
};