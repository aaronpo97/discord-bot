const Commando = require('discord.js-commando');
const registerGuild = require('../../database/utils/registerGuild');
const ServerInfo = require('../../database/schemas/ServerInfo');
module.exports = class InitSupportCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'db-init',
			group: 'utility',
			aliases: ['database-init'],
			memberName: 'dbinit',
			description: 'Fix database connection.',
			clientPermissions: ['ADMINISTRATOR'],
			userPermissions: ['ADMINISTRATOR'],
			guildOnly: true,
		});
	}
	async run(message) {
		const queriedServerInfo = await ServerInfo.findOne({ guildID: message.guild.id });
		if (queriedServerInfo) {
			message.channel.send('Your server is already intialized with the database.');
			return;
		}
		const addedServer = await registerGuild(message.guild);

		message.channel.send(`Your server is now registered in the database.`);
		console.log(addedServer);
	}
};
