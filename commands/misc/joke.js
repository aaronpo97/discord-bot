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
		try {
			const res = await fetch('https://icanhazdadjoke.com', { headers: { Accept: 'application/json' } });
			const { joke } = await res.json();
			message.channel.send(joke);
		} catch (error) {
			if (error.name === 'FetchError') {
				message.channel.send(`Sorry, something went wrong on our end.`);
				return;
			}
			message.channel.send(`Sorry, something went wrong.`);
		}
	}
};
