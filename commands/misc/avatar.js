const Commando = require('discord.js-commando');
const Discord = require('discord.js');

const createImageEmbed = message => {
	const imageConfig = {
		size: 2048,
		format: 'png',
		dynamic: true,
	};
	const { author } = message;
	const taggedUser = message.mentions.users.first();

	return new Discord.MessageEmbed()
		.setTitle(taggedUser ? `${taggedUser.tag}'s Avatar!` : `Your avatar:`)
		.setImage(taggedUser ? taggedUser.displayAvatarURL(imageConfig) : author.displayAvatarURL(imageConfig));
};

module.exports = class AvatarCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'avatar',
			group: 'misc',
			aliases: ['pfp', 'profilepic'],
			memberName: 'avatar',
			description: `Displays a user's avatar.`,
		});
	}
	run = message => message.channel.send(createImageEmbed(message));
};
