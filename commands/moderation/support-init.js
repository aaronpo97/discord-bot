const Commando = require('discord.js-commando');
const ServerInfo = require('../../database/schemas/ServerInfo');

const initSupportChannel = require('./controllers/initializeSupportChannel');
const updateSupportChannel = require('./controllers/updateSupportChannel');

module.exports = class InitSupportCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'support-init',
			group: 'moderation',
			aliases: ['sup-init'],
			memberName: 'support-init',
			description: 'Initialize the support command.',
			argsType: 'single',
			clientPermissions: ['ADMINISTRATOR'],
			userPermissions: ['ADMINISTRATOR'],
			guildOnly: true,
		});
	}
	async run(message) {
		const queriedServerInfo = await ServerInfo.findOne({ guildID: message.guild.id });
		if (!queriedServerInfo) {
			message.channel.send(
				'Your server has not been intialized with the database. This process normally happens once I join your server. To fix this, please run command `db-init`.'
			);
			return;
		}
		const { supportChannelID } = queriedServerInfo;

		if (!supportChannelID) {
			initSupportChannel(message);
		} else {
			updateSupportChannel(message, queriedServerInfo);
		}
	}
};
