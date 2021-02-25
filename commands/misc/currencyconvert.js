const Commando = require('discord.js-commando');
const axios = require('axios');

module.exports = class TemperatureConvertCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'temperature convert',
			group: 'misc',
			memberName: 'currency-convert',
			aliases: ['currencyconvert'],
			description: 'Convert currencies.',
			argsType: 'multiple',
		});
	}
	run(message, args) {}
};
