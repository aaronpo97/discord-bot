require('dotenv').config();
require('colors');

const path = require('path');
const Commando = require('discord.js-commando');
const client = new Commando.CommandoClient({
	owner: process.env.BOT_OWNER,
	commandPrefix: process.env.BOT_PREFIX,
});
const automod = require('./automod');
const mongoose = require('mongoose');

client.on('ready', () => {
	client.registry
		.registerGroups([
			['moderation', 'mod commands'],
			['misc', 'misc commands'],
		])
		.registerDefaults()
		.registerCommandsIn(path.join(__dirname, 'commands'));

	const validStatusType = ['online', 'invisible', 'dnd', 'idle'];
	let status = process.argv[2];
	if (!validStatusType.includes(status)) status = 'online';
	client.user.setStatus(status);

	console.log(`${client.user.tag.blue} is now live.`);

	console.log(`Now connected to: \n`);
	client.guilds.cache.forEach(guild => console.log(guild.name));
	console.log(`\nStatus set to ${status == 'online' ? status.green : status.red}.`);

	mongoose
		.connect(process.env.MONGO_SERVER_LINK, { useNewUrlParser: true, useUnifiedTopology: true })
		.then(() => {
			console.log('MongoDB connection established.');
		})
		.catch(err => {
			console.log('MongoDB connection error.');
			console.log(err);
		});
});

client.on('message', message => automod(message));

client.login(process.env.BOT_TOKEN);
