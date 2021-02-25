const Commando = require('discord.js-commando');

module.exports = class KickCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'kick',
			group: 'moderation',
			memberName: 'kick',
			description: 'Kicks a member from the discord server.',
			clientPermissions: ['KICK_MEMBERS'],
			userPermissions: ['KICK_MEMBERS'],
			argsType: 'multiple',
		});
	}
	async run(message, args) {
		const target = message.mentions.users.first();
		const reason = args.slice(1).join(' ');
		if (!target) return message.reply('Please specify someone to kick.');
		const member = message.guild.members.cache.get(target.id);
		if (!member.kickable) {
			message.reply('I cannot kick that user.');
		} else {
			member.kick(reason);
			await message.reply('That user has been kicked.');
		}
	}
};
