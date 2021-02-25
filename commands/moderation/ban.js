const Commando = require('discord.js-commando');

module.exports = class BanCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'ban',
			group: 'moderation',
			memberName: 'ban',
			description: 'Bans a member from the discord server.',
			clientPermissions: ['BAN_MEMBERS'],
			userPermissions: ['BAN_MEMBERS'],
			argsType: 'multiple',
		});
	}
	run(message, args) {
		const target = message.mentions.users.first();
		const reason = args.slice(1).join(' ');
		console.log(reason);
		if (!target) return message.reply('Please specify someone to ban.');
		const member = message.guild.members.cache.get(target.id);
		if (!member.bannable) {
			message.reply('I cannot ban that user.');
		} else {
			member.ban({ days: 7, reason: reason });
			message.reply('That user has been banned.');
		}
	}
};
