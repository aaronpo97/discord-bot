const Discord = require('discord.js');
module.exports.supportedCurrencies = [
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

module.exports.helpEmbed1 = new Discord.MessageEmbed()
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

module.exports.helpEmbed2 = new Discord.MessageEmbed()
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

// module.exports.chooseExchangeRate = ({ rates }, convertedCurrency) => {
// 	switch (convertedCurrency) {
// 		case 'CAD':
// 			return rates.CAD;
// 		case 'HKD':
// 			return rates.HKD;
// 		case 'ISK':
// 			return rates.ISK;
// 		case 'PHP':
// 			return rates.PHP;
// 		case 'DKK':
// 			return rates.DNK;
// 		case 'HUF':
// 			return rates.HUF;
// 		case 'CZK':
// 			return rates.CZK;
// 		case 'GBP':
// 			return rates.GBP;
// 		case 'RON':
// 			return rates.RON;
// 		case 'SEK':
// 			return rates.SEK;
// 		case 'IDR':
// 			return rates.IDR;
// 		case 'INR':
// 			return rates.INR;
// 		case 'BRL':
// 			return rates.BRL;
// 		case 'RUB':
// 			return rates.RUB;
// 		case 'HRK':
// 			return rates.HRK;
// 		case 'JPY':
// 			return rates.JPY;
// 		case 'THB':
// 			return rates.THB;
// 		case 'CHF':
// 			return rates.CHF;
// 		case 'EUR':
// 			return rates.EUR;
// 		case 'MYR':
// 			return rates.MYR;
// 		case 'BGN':
// 			return rates.BGN;
// 		case 'TRY':
// 			return rates.TRY;
// 		case 'CNY':
// 			return rates.CNY;
// 		case 'NOK':
// 			return rates.NOK;
// 		case 'NZD':
// 			return rates.NZD;
// 		case 'ZAR':
// 			return rates.ZAR;
// 		case 'USD':
// 			return rates.USD;
// 		case 'MXN':
// 			return rates.MXN;
// 		case 'SGD':
// 			return rates.SGD;
// 		case 'AUD':
// 			return rates.AUD;
// 		case 'ILS':
// 			return rates.ILS;
// 		case 'KRW':
// 			return rates.KRW;
// 		case 'PLN':
// 			return rates.PLN;
// 	}
// };
