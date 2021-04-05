const Discord = require('discord.js');
const axios = require('axios');
const moment = require('moment');

module.exports = {
	name: 'crypto',
    description: 'To show the information about Bitcoin price now.',
	async execute(message, args) {
        if (args.length === 0) {
            const helpEmbed = new Discord.MessageEmbed()
                .setColor('#ff9900')
                .setTitle('Welcome to -crypto command')
                .setDescription('Will return your current cryptocurrency rate and information')
                .addFields(
                    {name: 'arguments', value: '-crypto [CRYPTO SYMBOL/NAME (If more than one word, please use - for seperator)] [3 DIGIT CURRENCY CODE] [VALUE FOR CONVERSION(optional)]'},
                    {name: 'note about first argument', value: 'Please use Symbol for more accurate result (ADA, BTC, etc.)'},
                    {name: 'example 1', value: '-crypto eth usd'},
                    {name: 'example 2', value: '-crypto the-graph gbp 10'},
                    {name: 'example 3', value: '-crypto doge'},
                )
            message.reply(helpEmbed)
            return
        }
        const curr = args[1] || 'usd';
        if (curr.length !== 3) {message.reply('please insert correct 3 digit currency code (example: USD)'); return}
        const crypt = args[0].toLowerCase();
        message.reply(`Searching current information about ${crypt} for you :)`);
        try {
        const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: {
                vs_currency: curr,
                order: 'market_cap_desc',
                per_page: 250,
                page: 1,
                sparkline: false,
            }
        });
        for (let currentCrypto of res.data) {
            if (currentCrypto.symbol === crypt || currentCrypto.id === crypt) {
                const { name, id, symbol, image, current_price, market_cap, total_volume, high_24h, low_24h, last_updated} = currentCrypto;
                const cryptEmbed = new Discord.MessageEmbed()
                    .setColor('#ff9900')
                    .setTitle(`${name} at ${moment(last_updated).format('MMMM Do YYYY, h:mm:ss a')}`)
                    .setAuthor('Juliet Persia (Powered by Coingecko!)', 'https://cdn.anisearch.com/images/character/cover/full/69/69174.jpg')
                    .setDescription(`Coin Name: ${name}
                    Coingecko id: ${id}
                    symbol: ${symbol.toUpperCase()}`)
                    .addFields(
                        {name: `Current price in ${curr}`, value: current_price},
                        {name: `Markep Cap in ${curr}`, value: market_cap},
                        {name: `Total volume in ${curr}`, value: total_volume},
                        {name: `Highest 24h in ${curr}`, value: high_24h},
                        {name: `Lowest 24h in ${curr}`, value: low_24h},
                    )
                    .setTimestamp()
                    .setImage(image)
                message.reply(cryptEmbed)
                if (args[2]) {
                    const firstEmbed = new Discord.MessageEmbed()
                        .setColor('#ff9900')
                        .setTitle(`If you have ${args[2]} ${symbol.toUpperCase()}, you now have ${args[2] * current_price} ${curr.toUpperCase()}`)
                    const secondEmbed = new Discord.MessageEmbed()
                        .setColor('#ff9900')
                        .setTitle(`If you have ${args[2]} ${curr.toUpperCase()}, you can have ${args[2] / current_price} ${symbol.toUpperCase()}`)
                    message.reply(secondEmbed)
                    message.reply(firstEmbed)
                }
                return
            }
        }
        }
        catch (err) {
            message.reply('Sorry, cannot found the crypto :(')
            console.log(err);
        }
	},
};