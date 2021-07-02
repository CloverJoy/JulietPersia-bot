const Discord = require('discord.js');
const axios = require('axios');


module.exports = {
	name: 'tarot',
    description: 'Rider Weite tarot lalala',
    args: true,
	async execute(message, args) {
		if (args[0] === 'foo' && args.length > 0) {
      console.log(args)
			return message.channel.send(`Playing ${args.join(' ')}`);
		}
    if (args[0] === 'read') {
      try {
        const question = args.slice(1)
        const res = await axios.get('https://rws-cards-api.herokuapp.com/api/v1/cards/random?n=1');
        console.log(res.data);
        console.log(question.join(' '));
        const tarotEmbed = new Discord.MessageEmbed()
          .setColor('#bd6982')
          .setTitle(res.data.cards[0].name)
          .setDescription(`Question: ${question.join(' ')}`)
          .setAuthor('Tarot reading by Juliet Persia')
          .setImage(`https://raw.githubusercontent.com/CloverJoy/CloverJoy/master/assets/cards/${res.data.cards[0].name_short}.jpg`)
          .addFields({name: 'Meaning', value: res.data.cards[0].meaning_up})
        message.reply(tarotEmbed)
      }

      catch (error) {
        console.log(error);
      }
    }
	},
};