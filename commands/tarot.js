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
          .setDescription(res.data.cards[0].meaning_up)
          .setAuthor('Tarot reading by Juliet Persia')
          .setImage(`https://raw.githubusercontent.com/CloverJoy/CloverJoy/master/assets/cards/${res.data.cards[0].name_short}.jpg`)
          .addFields({name: 'Question', value: question.join(' ') || 'General'}, {name: 'Client', value: message.author})
        message.reply('Reading Tarot Card....')
        message.reply(tarotEmbed)
      }

      catch (error) {
        console.log(error);
      }
    }

    if (args[0] === 'read3') {
      try {
        const question = args.slice(1)
        const res = await axios.get('https://rws-cards-api.herokuapp.com/api/v1/cards/random?n=3');
        const tarotEmbed = new Discord.MessageEmbed()
          .setColor('#bd6982')
          .setTitle(`Left Card: ${res.data.cards[0].name}`)
          .setDescription(res.data.cards[0].meaning_up)
          .setAuthor('Tarot reading by Juliet Persia')
          .setImage(`https://raw.githubusercontent.com/CloverJoy/CloverJoy/master/assets/cards/${res.data.cards[0].name_short}.jpg`)
          .addFields({name: 'Question', value: question.join(' ') || 'General'}, {name: 'Client', value: message.author})
        const tarotEmbed1 = new Discord.MessageEmbed()
          .setColor('#bd6982')
          .setTitle(`Center Card: ${res.data.cards[1].name}`)
          .setImage(`https://raw.githubusercontent.com/CloverJoy/CloverJoy/master/assets/cards/${res.data.cards[1].name_short}.jpg`)
          .setDescription(res.data.cards[1].meaning_up)
          .addFields({name: 'Question', value: question.join(' ') || 'General'}, {name: 'Client', value: message.author})
        const tarotEmbed2 = new Discord.MessageEmbed()
          .setColor('#bd6982')
          .setTitle(`Right Card: ${res.data.cards[2].name}`)
          .setImage(`https://raw.githubusercontent.com/CloverJoy/CloverJoy/master/assets/cards/${res.data.cards[2].name_short}.jpg`)
          .setDescription(res.data.cards[2].meaning_up)
          .addFields({name: 'Question', value: question.join(' ') || 'General'}, {name: 'Client', value: message.author})
        message.reply(`Reading 3 Cards Tarot Spread....`)
        message.reply(tarotEmbed)
        message.reply(tarotEmbed1)
        message.reply(tarotEmbed2)
      }

      catch (error) {
        console.log(error);
      }
    }
	},
};