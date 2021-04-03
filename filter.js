const filter = 'bean';

module.exports = async message => {
	try {
		if (message.author.bot || message.channel.id !== '820832762680311808') return;
		if (message.content !== filter) {
			setTimeout(() => message.delete(), 100);
			const reply = await message.channel.send(`In this channel you are only allowed to say the word: '${filter}'`);
			setTimeout(() => reply.delete(), 600);
		}
	} catch (err) {
		console.error(err);
	}
};
