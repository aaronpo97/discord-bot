const Commando = require('discord.js-commando');
require('dotenv').config();
const botPrefix = process.env.BOT_PREFIX;
const fetch = require('node-fetch');

const { supportedCurrencies } = require('./utils/currencyconvert');

class APIError extends Error {
	constructor(type, statusCode, info) {
		super();
		this.name = 'APIError';
		this.type = type;
		this.statusCode = statusCode;
	}
}

module.exports = class CurrencyConvertCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'currency-convert',
			group: 'misc',
			memberName: 'currency-convert',
			aliases: ['currencyconvert', 'convertcurrency', 'convertcurrencies', 'convert-currency', 'cc', 'c-c'],
			description: 'Convert money to a different currency.',
			argsType: 'multiple',
			examples: [`${botPrefix}currency-convert 100 usd cad`, `${botPrefix}currency-convert 120 brl eur`],
		});
	}
	async run(message, args) {
		try {
			if (!args.length || args[0].toUpperCase() === 'HELP') {
				message.channel.send(
					`Help: To use command type \`${botPrefix} currency-convert [amount] [base currency] [target currency]\`.`
				);

				return;
			}
			const initialValue = parseFloat(args[0]);
			const baseCurrency = args[1].toUpperCase();
			const convertedCurrency = args[2].toUpperCase();
			if (!(initialValue || initialValue === 0)) {
				message.channel.send(`Error, invalid amount. Use command ${botPrefix}currency-convert help to get assistance.`);
				return;
			}
			if (!(supportedCurrencies.includes(baseCurrency) && supportedCurrencies.includes(convertedCurrency))) {
				message.channel.send('Error, invalid currency type.');
				return;
			}
			const res = await fetch(`https://api.exchangerate.host/latest?base=${baseCurrency}`);
			const data = await res.json();
			if (!data.success) throw new APIError(data.error.type, data.error.code, data.error.info);

			const exchangeRate = data.rates[convertedCurrency];
			const convertedValue = initialValue * exchangeRate;
			message.channel.send(`${initialValue.toFixed(2)} ${baseCurrency} = ${convertedValue.toFixed(2)} ${convertedCurrency}`);
		} catch (error) {
			if (error.name === 'TypeError') {
				message.channel.send(`Invalid command usage. Use command ${botPrefix}currency-convert help to get assistance.`);
				return;
			}
			if (error.name === 'FetchError') {
				message.channel.send(`Sorry, something went wrong on our end.`);
				return;
			}
			if (error.name === 'APIError') {
				await message.channel.send(`Unable to make an API Request.`);
				await message.channel.send(`${error.name}: ${error.message}`);
				await message.channel.send(`Status: ${error.statusCode}`);

				return;
			}
			message.channel.send(`Something went wrong: ${error}`);
		}
	}
};
