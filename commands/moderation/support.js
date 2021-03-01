const Commando = require('discord.js-commando');
const dotenv = require('dotenv').config();
const supportChannelID = process.env.SUPPORT_CHANNEL_ID;
const Discord = require('discord.js');

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
			message.react('❌');
			await message.channel.send(
				'The bot owner/server administrator needs to indicate a support channel id. This command is unavailable until then.'
			);
			return;
		}
		const supportChannel = this.client.channels.cache.find((channel) => channel.id === supportChannelID);
		const reason = args.join(' ');
		if (!reason) {
			message.react('❌');
			await message.channel.send(`You didn't provide a reason for your support ticket.`);
			return;
		}
		const replyEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Requesting mod help.')
			.addFields({ name: 'Reason', value: reason });
		message.react('✅');
		await message.channel.send(replyEmbed);

		const helpEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Mod Help')
			.addFields(
				{ name: 'Requested by', value: `${message.author} in ${message.channel}`, inline: true },
				{ name: 'Reason', value: reason, inline: true },
				{ name: 'Message URL', value: `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}` }
			)
			.setTimestamp()
			.setFooter('Mod Help Ticket');

		await supportChannel.send(helpEmbed);
	}
};
