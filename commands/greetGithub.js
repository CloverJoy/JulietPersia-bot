module.exports = {
	name: 'greet',
	description: 'greeting to the user',
	execute(message, args) {
        if (args[0] === 'github') {
            message.channel.send(`Hi there, Welcome to Christoffel's Github profile! I'm really glad to meet you here :)`);
        }
	},
};