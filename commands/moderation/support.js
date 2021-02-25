const Commando = require('discord.js-commando');
const dotenv = require('dotenv').config();
const supportChannelID = process.env.SUPPORTCHANNELID;

module.exports = class BanCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'support',
			group: 'moderation',
			memberName: 'support',
			description: 'Create a ticket for mod support.',
			argsType: 'multiple',
		});
	}
	async run(message, args) {
		if (!supportChannelID) {
			message.channel.send('The bot owner needs to indicate a support channel id. This command is unavailable until then.');
			return;
		}
		const supportChannel = this.client.channels.cache.find(channel => channel.id === supportChannelID);
		const reason = args.join(' ');
		// message.delete(); //delete command usage
		if (!reason) {
			message.channel.send(`You didn't provide a reason for your support ticket.`);
			return;
		}
		await message.channel.send(`Creating mod ticket. Reason: ${reason}`);
		await supportChannel.send(`Support Ticket: Channel: ${message.channel}, Requested by ${message.author}, ${reason}`);
	}
};
