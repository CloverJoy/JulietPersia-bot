const react = require("react");

module.exports = {
	name: 'collectorr',
	description: 'Testing the collector',
	execute(message, args) {
  //   const filter = m => m.content.includes('juliet');
  //   const collector = message.channel.createMessageCollector(filter, {time: 5000});

  //   collector.on('collect', m => {
  //     console.log(`collected: ${m.content}`);
  //   });
  //   collector.on('end', collected => {
  //     console.log(collected.)
  //   });

    // message.channel.send('Thumb me now!!')
    //   .then(m => {
    //     let value = 0;
    //     m.react('👍');
    //     const filter = (reaction, user) => {
    //       return reaction.emoji.name === '👍' || user.id === message.author.id;
    //     };

    //     const collector = m.createReactionCollector(filter, { time: 10000, max: 2 });

    //     collector.on('collect', (reaction, user) => {
    //       console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
    //       value +=1
    //       collector.resetTimer();
    //     });

    //     collector.on('end', collected => {
    //       console.log(`Collected ${collected.size} items`);
    //       m.channel.send(`Yoo, Value collected is: ${value}`)
    //     });
    //   });

    message.author.send('Are you korean?')
      .then(m => {
        const data = {};
        m.react('👍')
        m.react('👎')
        const filterone = ((reaction, user) => {
          return reaction.emoji.name === '👍' && user.id === message.author.id;
        });
        const collone = m.createReactionCollector(filterone, {time: 10000, max: 3});
        collone.on('collect', (reaction, user) => {
          data.korean = true;
          m.channel.send('Do you know Rocket punch?')
            .then(m2 => {
              m2.react('👍')
              m2.react('👎')
              const colltwo = m2.createReactionCollector(filterone, {time: 10000, max: 3});
              colltwo.on('collect', (reaction, user) => {
                data.knowRocketPunch = true;
                colltwo.stop();
                collone.stop();
              });
            });
        })
        collone.on('end', () => {
          if (data.korean && data.knowRocketPunch) {
            message.author.send('SO COOL MAN!!')
            return
          }
          message.author.send(':(')
          console.log(data)
        })
      })
	},
};