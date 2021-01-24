module.exports = {
	name: 'hello',
	description: 'greeting to the user',
	execute(message, args) {
		message.channel.send(`Hi there, ${message.author.username}! :D`);
	},
};