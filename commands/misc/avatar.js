const Commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class AvatarCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'avatar',
			group: 'misc',
			aliases: ['pfp'],
			memberName: 'avatar',
			description: `Displays a user's avatar.`,
		});
	}
	run(message) {
		if (!message.mentions.users.first()) {
			const imageEmbed = new Discord.MessageEmbed()
				.setTitle('Your avatar:')
				.setURL(message.author.displayAvatarURL({ format: 'png', dynamic: true }))
				.setImage(
					message.author.displayAvatarURL({
						size: 2048,
						format: 'png',
						dynamic: true,
					})
				);
			message.channel.send(imageEmbed);
		} else {
			const userRequest = message.mentions.users.first();
			const imageEmbed = new Discord.MessageEmbed()
				.setTitle(`${userRequest.tag}'s avatar!`)
				.setURL(userRequest.displayAvatarURL())
				.setImage(
					userRequest.displayAvatarURL({
						size: 2048,
						format: 'png',
						dynamic: true,
					})
				);
			message.channel.send(imageEmbed);
		}
	}
};
