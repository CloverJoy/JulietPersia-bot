const Discord = require('discord.js');
const axios = require('axios');
const moment = require('moment');

module.exports = {
	name: 'btc',
    description: 'To show the information about Bitcoin price now.',
    args: false,
	async execute(message, args) {
        message.reply('Searching current Bitcoin rate for you :)');
        try {
        const res = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json'); 
        const { time, disclaimer, chartName, bpi } = res.data;
        const btcEmbed = new Discord.MessageEmbed()
                .setColor('#7fffd4')
                .setTitle(`${chartName} rate at ${moment(time.updatedISO).format('MMMM Do YYYY, h:mm:ss a')}!`)
                .setAuthor('Juliet Persia (Powered by coindesk!)', 'https://cdn.anisearch.com/images/character/cover/full/69/69174.jpg')
                .setDescription(disclaimer)
                .addFields(
                    {name: `Bitcoin to ${bpi.USD.description}`, value:`${bpi.USD.rate} ${bpi.USD.code}`},
                    {name: `Bitcoin to ${bpi.GBP.description}`, value:`${bpi.GBP.rate} ${bpi.GBP.code}`},
                    {name: `Bitcoin to ${bpi.EUR.description}`, value:`${bpi.EUR.rate} ${bpi.EUR.code}`},
                )
                .setImage('https://localbitcoinnow.com/wp-content/uploads/2019/12/The-bit-logo-e1575819611411.png')
                message.channel.send(btcEmbed);
        } 
        catch (err) {
            console.log(err);
        }
	},
};