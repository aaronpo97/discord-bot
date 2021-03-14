const Commando = require('discord.js-commando');
require('dotenv').config();
const fetch = require('node-fetch');

const { supportedCurrencies, helpEmbed1, helpEmbed2 } = require('./utils/currencyconvert');

module.exports = class CurrencyConvertCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'currency-convert',
			group: 'misc',
			memberName: 'currency-convert',
			aliases: ['currencyconvert', 'convertcurrency', 'convertcurrencies', 'convert-currency', 'cc', 'c-c'],
			description: 'Convert money to a different currency.',
			argsType: 'multiple',
			examples: [
				`${process.env.BOT_PREFIX}currency-convert 100 usd cad`,
				`${process.env.BOT_PREFIX}currency-convert 120 brl eur`,
			],
		});
	}
	async run(message, args) {
		try {
			if (!args.length || args[0].toUpperCase() === 'HELP') {
				message.channel.send(
					`Help: To use command type \`${process.env.BOT_PREFIX} currency-convert [amount] [base currency] [target currency]\`.`
				);
				// await message.channel.send(helpEmbed1);
				// await message.channel.send(helpEmbed2);
				// todo  fix the help section so that the embeds only show when the user wants them
				return;
			}
			const initialValue = parseFloat(args[0]);
			const baseCurrency = args[1].toUpperCase();
			const convertedCurrency = args[2].toUpperCase();
			if (!(initialValue || initialValue === 0)) {
				message.channel.send(
					`Error, invalid amount. Use command ${process.env.BOT_PREFIX}currency-convert help to get assistance.`
				);
				return;
			}
			if (!(supportedCurrencies.includes(baseCurrency) && supportedCurrencies.includes(convertedCurrency))) {
				message.channel.send('Error, invalid currency type.');
				return;
			}

			const res = await fetch(`https://api.exchangeratesapi.io/latest?base=${baseCurrency}`);
			const data = await res.json();
			const exchangeRate = data.rates[convertedCurrency];
			const convertedValue = initialValue * exchangeRate;
			message.channel.send(
				`${initialValue.toFixed(2)} ${baseCurrency} = ${convertedValue.toFixed(2)} ${convertedCurrency}`
			);
		} catch (error) {
			if (error.name === 'TypeError') {
				message.channel.send(
					`Invalid command usage. Use command ${process.env.BOT_PREFIX}currency-convert help to get assistance.`
				);
				return;
			}
			if (error.name === 'FetchError') {
				message.channel.send(`Sorry, something went wrong on our end.`);
				return;
			}
			message.channel.send(`Something went wrong: ${error}`);
		}
	}
};
