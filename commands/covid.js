const Discord = require('discord.js');
const axios = require('axios');
const moment = require('moment');
const today = moment().format('MMMM Do YYYY'); 

module.exports = {
	name: 'covid',
    description: 'Information about covid.',
    args: true,
	async execute(message, args) {
        try {
            if (args[0].toLowerCase() === 'korea') {
                args[0] = 'kor';
            }
            if (args[0].toLowerCase() === 'timor' || args.join(' ').toLowerCase() === 'timor leste' || args.join(' ').toLowerCase() === 'east timor') {
                args = [];
                args[0] = 'tl';
            }
        const req = args.length === 1 ? args[0]: args.join('%20');
        message.reply(`I will try to find covid information in ${req.split('%20').join(' ')}, Don't forget to wear your mask! :D`);
        const res = await axios.get(`https://disease.sh/v3/covid-19/countries/${req}?yesterday=true&strict=true`);
        if (res.data.message) { 
            message.reply(`Sorry, ${res.data.message} `);
            return;
        };
        const { country, countryInfo, cases, todayCases, deaths, todayDeaths, recovered, todayRecovered, continent, population } = res.data;
        const covidEmbed = new Discord.MessageEmbed()
                .setColor('#7fffd4')
                .setTitle(`COVID in ${country} (${today})`)
                .setAuthor('Juliet Persia (Powered by disease.sh)', 'https://cdn.anisearch.com/images/character/cover/full/69/69174.jpg')
                .setThumbnail('https://covid-19-apis.postman.com/static/covid19-image-2-0e295f09eccf0fa3f4778159cd065f5d.png')
                .setDescription(`Code: ${countryInfo.iso2}/${countryInfo.iso3} | Continent: ${continent} | Population: ${population} |
                lat/long: ${countryInfo.lat}/${countryInfo.long}`)
                .addFields(
                    {name: `Total cases:`, value: cases},
                    {name: `Today cases:`, value: todayCases},
                    {name: `total deaths:`, value: deaths},
                    {name: 'Today deaths:', value: todayDeaths},
                    {name: 'Total recovered:', value:recovered},
                    {name: 'Today revocered:', value: todayRecovered},
                )
                .setImage(countryInfo.flag)
                message.channel.send(covidEmbed);
        } 
        catch (err) {
            message.reply('Sorry, cannot find the country (or maybe check your spelling?) or internal server error :(')
            console.log(err);
        }
	},
};
