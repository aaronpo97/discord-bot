/*      
	DiscordBot
   Copyright (C) 2021 Aaron Po

   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with this program.  If not, see <https://www.gnu.org/licenses/>.

*/

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
	console.log(`${client.user.tag.blue} is now live. \n`);

	console.log('Copyright (C) 2021 Aaron Po');
	console.log('This program comes with ABSOLUTELY NO WARRANTY.');
	console.log('This is free software, and you are welcome to redistribute it under certain conditions.');

	console.log(`Visit ${`https://github.com/aaronpo97/discord-bot`.yellow} to learn more.`);

	console.log(`\nNow connected to: \n`);
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

// client.on('error', () => {
// 	console.log('Could not connect to the Discord API.');
// });

// TODO deal with error handling for when the bot cannot connect to the discord api, the client.on("error") does not seem to work

client.login(process.env.BOT_TOKEN);
