const Discord = require('discord.js');
const axios = require('axios');
const moment = require('moment');
const today = moment().format('dddd').toLowerCase(); 
const todayComplete = moment().format('MMMM DD YYYY')
const dates = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const noNullNumber = (num) => {
    if (num === null) {
        return 'Not yet scored';
    } 
    return num;
}

module.exports = {
	name: 'anime',
    description: 'Information about the arguments provided.',
    args: true,
	execute(message, args) {
		if (args.length > 0 && args[0].toLowerCase() === 'today' && args[1] === 'random') {
            message.channel.send(`Here is random ongoing anime for ${args[0]}: ${today}`);
            axios.get(`https://api.jikan.moe/v3/schedule/${today}`)
                .then((result) => {
                const randomNumber = Math.floor(Math.random() * result.data[today].length)
                const data = result.data[today][randomNumber];
                const todayEmbed = new Discord.MessageEmbed()
                .setColor('#7fffd4')
                .setTitle(data.title)
                .setAuthor('Juliet Persia (thanks to Jikan API! :D)', 'https://cdn.anisearch.com/images/character/cover/full/69/69174.jpg')
                .setDescription(data.synopsis)
                .addFields(
                    {name: 'Aired', value: moment(data.airing_start).format('MMMM DD YYYY')},
                    {name: 'source', value: data.source},
                    {name: 'Score', value: noNullNumber(data.score)},
                    {name: 'link', value: data.url},
                )
                .setImage(data.image_url)
                message.channel.send(todayEmbed);
            });	
        }
        if (args.length === 1 && args[0].toLowerCase() === 'today') {
            message.channel.send(`Here is ongoing anime list for today`);
            axios.get(`https://api.jikan.moe/v3/schedule/${today}`)
                .then((result) => {
                const data = result.data[today];
                const listEmbed = new Discord.MessageEmbed()
                .setColor('#7fffd4')
                .setTitle(`Anime for ${todayComplete}`)
                .setAuthor('Juliet Persia (thanks to Jikan API! :D)', 'https://cdn.anisearch.com/images/character/cover/full/69/69174.jpg')
                .setDescription('This is the list of anime for today! If you want the detail about the anime, type: ```~anime today (number beside the title)```')
                .addFields(data.map((anime, idx) => {
                    return {name: `${anime.title} (${idx})`, value: anime.url};
                }))
                .setImage(data[0].image_url)
                message.channel.send(listEmbed);
            });	
        }
        if (args.length === 2 && parseInt(args[1])) {
            const idx = Math.floor(parseInt(args[1]));
            axios.get(`https://api.jikan.moe/v3/schedule/${today}`)
            .then((result) => {
            const data = result.data[today][idx];
            const todayEmbed = new Discord.MessageEmbed()
            .setColor('#7fffd4')
            .setTitle(data.title)
            .setAuthor('Juliet Persia (thanks to Jikan API! :D)', 'https://cdn.anisearch.com/images/character/cover/full/69/69174.jpg')
            .setDescription(data.synopsis)
            .addFields(
                {name: 'Aired', value: moment(data.airing_start).format('MMMM DD YYYY')},
                {name: 'source', value: data.source},
                {name: 'Score', value: noNullNumber(data.score)},
                {name: 'link', value: data.url},
            )
            .setImage(data.image_url)
            message.channel.send(`Here is the information about ${data.title}`);
            message.channel.send(todayEmbed);
        });	
        }
        
	},
};