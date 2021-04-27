const Commando = require('discord.js-commando');
const { farToCel, farToKel, celToFar, celToKel, kelToCel, validUnits, checkIfUsesDegree } = require('./utils/tempconvert');

module.exports = class TemperatureConvertCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'temp-convert',
			group: 'misc',
			memberName: 'temp-convert',
			aliases: ['tempconvert', 'temp-convert', 'tc', 'ct', 'convert-temperature', 'converttemp', 'c-temp'],
			description: 'Convert temperatures.',
			argsType: 'multiple',
		});
	}
	async run(message, args) {
		const initialTemp = parseFloat(args[0]);
		if (!(initialTemp || initialTemp === 0)) {
			message.channel.send('Invalid temperature.');
			return;
		}
		const initialUnit = args[1].toUpperCase();
		if (!validUnits.includes(initialUnit)) {
			message.channel.send('Invalid initial temperature unit type.');
			return;
		}
		const convertedUnit = args[2].toUpperCase();
		if (!validUnits.includes(convertedUnit)) {
			message.channel.send('Invalid final temperature unit type.');
			return;
		}
		if (initialUnit === 'C' && convertedUnit === 'F') {
			message.channel.send(`${initialTemp}° C is ${celToFar(initialTemp).toFixed(2)}° F.`);
			return;
		}
		if (initialUnit === 'F' && convertedUnit === 'C') {
			message.channel.send(`${initialTemp}° F is ${farToCel(initialTemp).toFixed(2)}° C.`);
			return;
		}
		if (initialUnit === 'F' && convertedUnit === 'K') {
			message.channel.send(`${initialTemp}° F is ${farToKel(initialTemp).toFixed(2)} K`);
			return;
		}
		if (initialUnit === 'K' && convertedUnit === 'F') {
			message.channel.send(`${initialTemp} K is ${kelToFar(initialTemp).toFixed(2)} ° F`);
			return;
		}
		if (initialUnit === 'K' && convertedUnit === 'C') {
			message.channel.send(`${initialTemp} K is ${kelToCel(initialTemp).toFixed(2)}° C`);
			return;
		}
		if (convertedUnit === 'C' && initialUnit === 'K') {
			message.channel.send(`${initialTemp} ° C is ${celToKel(initialTemp).toFixed(2)} K`);
		}

		if (initialUnit === convertedUnit) {
			message.channel.send(
				`${initialTemp}${checkIfUsesDegree(initialUnit)} ${initialUnit} is ${initialTemp}${checkIfUsesDegree(
					initialUnit
				)} ${initialUnit}.`
			);
			await message.channel.send(`Did you really need me to tell you that? You're a nitwit.`);
			return;
		}
	}
};
