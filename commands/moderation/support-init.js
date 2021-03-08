const Commando = require('discord.js-commando');

const Discord = require('discord.js');
const ServerInfo = require('../../schemas/ServerInfo');
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
		try {
			const findServer = await ServerInfo.findOne({ guildID: message.guild.id });
			// if (findServer) {
			message.channel.send('Your server is already registered within our database. Would you like to update the information? (Yes/No)');

			const collectOne = await message.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 5000 });
			console.log(collectOne);
			if (!collectOne.first()) throw new Error(errorTimeoutMessage);
			if (collectOne.first().content.toLowerCase() === 'yes') {
				message.reply(`The channel being used for support messages is: <#${findServer.supportChannelID}>. Is this correct?`);
			} else throw new Error();

			const collectTwo = await message.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 10000 });
			if (!collectTwo) throw new Error(errorTimeoutMessage);
			if (collectTwo.first().content.toLowerCase() === 'no') {
				console.log(collectTwo.first().content);
				message.channel.send('Please indicate the new support channel. ');
			} else throw new Error();

			const collectThree = await message.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 10000 });
			if (!collectThree) throw new Error(errorTimeoutMessage);
			if (!collectThree.first().content) return;

			const updatedSupportChannel = collectThree.first().content;
			message.channel.send(`You have chosen: ${updatedSupportChannel}. Is that correct?`);

			const collectFour = await message.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 10000 });
			if (!collectFour) throw new Error(errorTimeoutMessage);
			if (collectFour.first().content.toLowerCase() === 'yes') {
				message.channel.send(`Great! The support channel is now ${updatedSupportChannel} `);
				findServer.supportChannelID = updatedSupportChannel.slice(2, -1);
				await findServer.save();
			} else throw new Error();
		} catch (e) {
			message.channel.send(`Command aborted. ${e.message ? e : ''}`);
		}
	}
};
