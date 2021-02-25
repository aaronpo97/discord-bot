const dotenv = require('dotenv').config();
const colors = require('colors');

const path = require('path');
const Commando = require('discord.js-commando');
const client = new Commando.CommandoClient({ owner: process.env.BOT_OWNER, commandPrefix: process.env.BOT_PREFIX });
const automod = require('./automod');

client.on('ready', async () => {
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

	console.log(`${client.user.tag} is now live.`);
	console.log(`Now connected to: \n`);
	client.guilds.cache.forEach(guild => console.log(guild.name));
	console.log(`\nStatus set to ${status == 'online' ? status.green : status.red}.`);
});

client.on('message', message => {
	automod(message);
});

client.login(process.env.BOT_TOKEN);
