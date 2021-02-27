const Discord = require('discord.js');
const axios = require('axios');

module.exports = {
	name: 'mtg',
    description: 'Information about MTG.',
    args: true,
	async execute(message, args) {
        try {
        message.reply(`I will try to find ${args.join(' ')} for you!`);
        const res = await axios.get(`https://api.magicthegathering.io/v1/cards`, {params: {name: args.join(' '), pageSize: 1}});
        if (res.data.cards.length === 0) { 
            message.reply('Sorry, I cannot find your card :(');
            return;
        };
        const { name, manaCost, type, rarity, text, legalities, imageUrl, power, toughness } = res.data.cards[0];
        const mtgEmbed = new Discord.MessageEmbed()
                .setColor('#7fffd4')
                .setTitle(name)
                .setAuthor('Juliet Persia (Powered by magicthegathering.io)', 'https://cdn.anisearch.com/images/character/cover/full/69/69174.jpg')
                .setDescription(text)
                .addFields(
                    {name: `Type`, value: type},
                    {name: `Mana Cost`, value: manaCost ? manaCost : 'N/A'},
                    {name: 'power/toughness', value: power && toughness ? `${power}/${toughness}` : 'N/A'},
                    {name: 'Rarity', value:rarity},
                )
                .addFields(legalities.map((item) => {
                    return {name: `${item.format}`, value: `legality: ${item.legality}`};
                }))
                .setImage(imageUrl)
                message.channel.send(mtgEmbed);
        } 
        catch (err) {
            message.reply('Sorry, Internal server error :(')
            console.log(err);
        }
	},
};
