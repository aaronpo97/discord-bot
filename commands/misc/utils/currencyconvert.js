const Discord = require('discord.js');
const supportedCurrencies = [
	'AUD',
	'BGN',
	'BRL',
	'CAD',
	'CHF',
	'CNY',
	'CZK',
	'DKK',
	'EUR',
	'GBP',
	'HKD',
	'HRK',
	'HUF',
	'IDR',
	'ILS',
	'INR',
	'ISK',
	'JPY',
	'KRW',
	'MXN',
	'MYR',
	'NOK',
	'NZD',
	'PHP',
	'PLN',
	'RON',
	'RUB',
	'SEK',
	'SGD',
	'THB',
	'TRY',
	'USD',
	'ZAR',
];

const helpEmbed1 = new Discord.MessageEmbed()
	.setColor('#000000')
	.setTitle('Supported currencies:')
	.setDescription('ISO Currency Codes:')
	.addFields(
		{ name: 'AUD', value: 'Australian Dollar' },
		{ name: 'BGN', value: 'Bulgarian Lev' },
		{ name: 'BRL', value: 'Brazilian Real' },
		{ name: 'CAD', value: 'Canadian Dollar' },
		{ name: 'CHF', value: 'Swiss Franc' },
		{ name: 'CNY', value: 'Chinese Yuan Renminbi' },
		{ name: 'CZK', value: 'Czech Koruna' },
		{ name: 'DKK', value: 'Danish Krone' },
		{ name: 'EUR', value: 'Euro' },
		{ name: 'GBP', value: 'Pound Sterling' },
		{ name: 'HKD', value: 'Hong Kong Dollar' },
		{ name: 'HRK', value: 'Croatian Kuna' },
		{ name: 'HUF', value: 'Hungarian Forint' }
	);

const helpEmbed2 = new Discord.MessageEmbed()
	.setColor('#000000')
	.setTitle('Supported currencies:')
	.setDescription('ISO Currency Codes:')
	.addFields(
		{ name: 'IDR', value: 'Indonesian Rupiah' },
		{ name: 'ILS', value: 'New Israeli Sheqel' },
		{ name: 'INR', value: 'Indian Rupee' },
		{ name: 'ISK', value: 'Iceland Krona' },
		{ name: 'JPY', value: 'Japanese Yen' },
		{ name: 'KRW', value: 'South Korean Won' },
		{ name: 'MXN', value: 'Mexican Peso' },
		{ name: 'MYR', value: 'Malaysian Ringgit' },
		{ name: 'NOK', value: 'Norwegian Krone' },
		{ name: 'NZD', value: 'New Zealand Dollar' },
		{ name: 'PHP', value: 'Philippine Peso' },
		{ name: 'PLN', value: 'Polish Zloty' },
		{ name: 'RON', value: 'Romanian Leu' },
		{ name: 'RUB', value: 'Russian Ruble' },
		{ name: 'SEK', value: 'Swedish Krona' },
		{ name: 'SGD', value: 'Singapore Dollar' },
		{ name: 'THB', value: 'Thai Baht' },
		{ name: 'TRY', value: 'Turkish Lira' },
		{ name: 'USD', value: 'US Dollar' },
		{ name: 'ZAR', value: 'Rand' }
	);

module.exports = { supportedCurrencies, helpEmbed1, helpEmbed2 };
