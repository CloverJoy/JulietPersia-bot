module.exports = {
	name: 'argsinfo',
    description: 'Information about the arguments provided.',
    args: true,
	execute(message, args) {
		if (args[0] === 'foo' && args.length > 0) {
      console.log(args)
			return message.channel.send(`Playing ${args.join(' ')}`);
		}

		message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
	},
};