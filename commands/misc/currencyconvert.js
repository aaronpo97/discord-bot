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
			description: 'Convert currencies.',
			argsType: 'multiple',
		});
	}
	async run(message, args) {
		console.log(process.env.BOT_PREFIX);
		try {
			if (!args.length || args[0].toUpperCase() === 'HELP') {
				message.channel.send('Help: To use command type `b!currency-convert [amount] [base currency] [target currency]`.');
				await message.channel.send(helpEmbed1);
				await message.channel.send(helpEmbed2);
				return;
			}
			const initialValue = parseFloat(args[0]);
			const baseCurrency = args[1].toUpperCase();
			const convertedCurrency = args[2].toUpperCase();
			if (!(initialValue || initialValue === 0)) {
				message.channel.send(`Error, invalid amount. Use command \` `);
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
			message.channel.send(`${initialValue.toFixed(2)} ${baseCurrency} = ${convertedValue.toFixed(2)} ${convertedCurrency}`);
		} catch (error) {
			console.log(error);
		}
	}
};
