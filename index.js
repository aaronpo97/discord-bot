/*      
	YerbBot - A general purpose Discord bot.
   Copyright © 2021 Aaron Po

   This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

   This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of 
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

   You should have received a copy of the GNU General Public License along with this program. If not, see https://www.gnu.org/licenses/.
*/

require('dotenv').config();

const Commando = require('discord.js-commando');
const client = new Commando.CommandoClient({
	owner: process.env.BOT_OWNER,
	commandPrefix: process.env.BOT_PREFIX,
});

const initializeApp = require('./initializeApp');
const automod = require('./automod');
const checkDeletedChannel = require('./database/utils/checkDeletedChannel');
const registerGuild = require('./database/utils/registerGuild');
const unregisterGuild = require('./database/utils/unregisterGuild');

client.on('ready', () => initializeApp(client));
client.on('message', message => automod(message));
client.on('channelDelete', channel => checkDeletedChannel(channel));
client.on('guildCreate', guild => registerGuild(guild));
client.on('guildDelete', guild => unregisterGuild(guild));

client.login(process.env.BOT_TOKEN);
