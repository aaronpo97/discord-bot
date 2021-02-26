const Commando = require('discord.js-commando');
const axios = require('axios');
const Discord = require('discord.js');
const { supportedCurrencies, helpEmbed1, helpEmbed2, chooseExchangeRate } = require('./utils/currencyconvert');
module.exports = class CurrencyConvertCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'currency-convert',
			group: 'misc',
			memberName: 'currency-convert',
			aliases: ['currencyconvert', 'convertcurrency', 'convertcurrencies', 'convert-currency'],
			description: 'Convert currencies.',
			argsType: 'multiple',
		});
	}
	async run(message, args) {
		if (!args.length || args[0].toUpperCase() === 'HELP' || !args[1]) {
			message.channel.send('Help: To use command type `b!currency-convert [amount] [base currency] [target currency]`.');
			await message.channel.send(helpEmbed1);
			await message.channel.send(helpEmbed2);
			return;
		}
		const initialValue = parseFloat(args[0]);
		const baseCurrency = args[1].toUpperCase();
		const convertedCurrency = args[2].toUpperCase();
		if (!(initialValue || initialValue === 0)) {
			return message.channel.send('Error, invalid amount.');
		}
		if (!(supportedCurrencies.includes(baseCurrency) && supportedCurrencies.includes(convertedCurrency))) {
			return message.channel.send('Error, invalid currency type.');
		}
		const res = await axios.get(`https://api.exchangeratesapi.io/latest?base=${baseCurrency}`);
		const { rates } = res.data;
		const exchangeRate = chooseExchangeRate(rates, convertedCurrency);
		const convertedValue = initialValue * exchangeRate;
		message.channel.send(`${initialValue.toFixed(2)} ${baseCurrency} = ${convertedValue.toFixed(2)} ${convertedCurrency}`);
	}
};
