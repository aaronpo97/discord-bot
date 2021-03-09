const Commando = require('discord.js-commando');
const ServerInfo = require('../../schemas/ServerInfo');

const { initSupportChannel, updateSupportChannel } = require('./controllers/support-init');

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
	async run(message, args) {
		const serverInfo = await ServerInfo.findOne({ guildID: message.guild.id });

		if (!serverInfo) {
			initSupportChannel(message);
		} else {
			updateSupportChannel(message, serverInfo);
		}
	}
};
