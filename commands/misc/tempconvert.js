const Commando = require('discord.js-commando');
const validUnits = ['C', 'F'];

const celToFar = c => c * (9 / 5) + 32;
const farToCel = f => (f - 32) * (5 / 9);

module.exports = class TemperatureConvertCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'temperature convert',
			group: 'misc',
			memberName: 'temp-convert',
			aliases: ['tempconvert'],
			description: 'Convert temperatures.',
			argsType: 'multiple',
		});
	}
	run(message, args) {
		const initialTemp = parseFloat(args[0]);
		if (!(initialTemp || initialTemp === 0)) {
			return message.channel.send('Invalid temperature.');
		}
		const initialUnit = args[1].toUpperCase();
		if (!validUnits.includes(initialUnit)) {
			return message.channel.send('Invalid initial temperature unit type.');
		}
		const convertedUnit = args[2].toUpperCase();
		if (!validUnits.includes(convertedUnit)) {
			return message.channel.send('Invalid final temperature unit type.');
		}
		if (initialUnit === 'C' && convertedUnit === 'F') {
			return message.channel.send(`${initialTemp}° C is ${celToFar(initialTemp)}° F.`);
		}
		if (initialUnit === 'F' && convertedUnit === 'C') {
			return message.channel.send(`${initialTemp}° F is ${farToCel(initialTemp)}° C.`);
		}
		if (initialUnit === convertedUnit) {
			return message.channel
				.send(`${initialTemp}° ${initialUnit} is ${initialTemp}° ${initialUnit}.`)
				.then(message =>
					message.channel.send(`Did you really need me to tell you that? You're a nitwit.`)
				);
		}
	}
};
