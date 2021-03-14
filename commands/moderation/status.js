const Commando = require('discord.js-commando');
module.exports = class StatusCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'status',
			group: 'moderation',
			memberName: 'status',
			description: 'Changes the status update of the bot.',
			userPermissions: ['ADMINISTRATOR'],
			argsType: 'multiple',
		});
	}
	async run(message, args) {
		if (!args.length) {
			message.react('❌');
			await message.channel.send('You did not provide any arguments.');
			await message.channel.send(
				'Be sure to include both the status message and type. To reset status add `RESET` as your first argument.'
			);
			await message.channel.send(
				'Valid status types: `WATCHING`, `PLAYING`, `LISTENING`, or `STREAMING`'
			);
			return;
		}
		const statusMessageType = args.shift().toUpperCase();
		const statusMessage = args.join(' ');
		const validStatusMessageType = ['WATCHING', 'PLAYING', 'LISTENING', 'STREAMING'];
		if (statusMessageType === 'RESET') {
			message.channel.send('Resetting status message.');
			await this.client.user.setActivity();
			return;
		}
		if (!validStatusMessageType.includes(statusMessageType)) {
			message.react('❌');
			await message.channel.send(
				'Invalid usage. Please use a valid status type (`WATCHING`, `PLAYING`, `LISTENING`, or `STREAMING`)'
			);
			return;
		}
		if (!statusMessage) {
			message.react('❌');
			await message.channel.send(
				'Invalid usage. You have to include a status message.'
			);
			return;
		}
		this.client.user.setActivity(statusMessage, { type: statusMessageType });
		await message.react('✅');
	}
};
