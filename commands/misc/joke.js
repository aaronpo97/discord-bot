const Commando = require('discord.js-commando');
const fetch = require('node-fetch');

module.exports = class JokeCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'joke',
			group: 'misc',
			memberName: 'joke',
			description: 'Tells you a joke.',
			argsType: 'single',
		});
	}
	async run(message, args) {
		const res = await fetch('https://icanhazdadjoke.com', { headers: { Accept: 'application/json' } });
		const { joke } = await res.json();
		message.channel.send(joke);
	}
};
