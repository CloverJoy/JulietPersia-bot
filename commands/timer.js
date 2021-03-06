module.exports = {
	  name: 'timer',
    description: 'All about timer',
    args: true,
	  execute(message, args) {
		let time = parseInt(args[0])
    const howLong = args[1].toLowerCase();
    const mes = args.slice(2).join(' ');
    const isMin = howLong === 'm' || howLong === 'min' || howLong === 'mins' || howLong === 'minute' || howLong === 'minutes';
    const isSec = howLong === 's' || howLong === 'sec' || howLong === 'secs' || howLong === 'second' || howLong === 'seconds';
    const isHr = howLong === 'h' || howLong === 'hr' || howLong === 'hrs' || howLong === 'hour' || howLong === 'hours';
    const alarm = () => {
      let i = 0;
      const interval = setInterval(() => {
        message.reply(`PIPIPIPI! PIPIPIPI! PIPIPIPI! PIPIPIPI! ${mes && (`Alarm for ${mes}!`)}`);
        i++;
        if (i === 3) {
          clearInterval(interval);
        }
      }, 2500)
    }
    if (isMin) {
      message.reply(`Okay, will ping you after ${time} min :D`);
      time = time * 60000
      setTimeout(alarm, time);
    }
    if (isSec) {
      message.reply(`Okay, will ping you after ${time} sec :D`);
      time = time * 1000
      setTimeout(alarm, time);
    }
    if (isHr) {
      message.reply(`Okay, will ping you after ${time} hr :D`);
      time = time * 3600000
      setTimeout(alarm, time);
    }
  },
}