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
                .setThumbnail('https://i.pinimg.com/originals/49/ca/a7/49caa737c24b38ac4ab196e2314f39e9.png')
                .setAuthor('Juliet Persia (Powered by magicthegathering.io)', 'https://cdn.anisearch.com/images/character/cover/full/69/69174.jpg')
                .setDescription(text)
                .addFields(
                    {name: `Type`, value: type},
                    {name: `Mana Cost`, value: manaCost ? manaCost : 'N/A', inline: true},
                    {name: 'power/toughness', value: power && toughness ? `${power}/${toughness}` : 'N/A', inline: true},
                    {name: 'Rarity', value:rarity},
                )
                .addFields(legalities.filter((item) => item.format === 'Commander' || item.format === 'Standard' || item.format === 'Legacy' || item.format === 'Vintage').map((item) => {
                    return {name: `${item.format}`, value: `legality: ${item.legality}`, inline: true};
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
