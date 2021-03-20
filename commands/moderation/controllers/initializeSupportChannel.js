const errorTimeoutMessage = 'The command timed out. Please try again.';

const messageCollectionConfig = { max: 1, time: 10000 };
const commandTimeoutMessage = `\nThis command will timeout after ${(messageCollectionConfig.time / 1000).toFixed(2)} ${
	messageCollectionConfig.time / 1000 === 1 ? 'second' : 'seconds'
}.`;
const ServerInfo = require('../../../database/schemas/ServerInfo');
module.exports = async message => {
	try {
		message.channel.send(
			'To initialize the support command, reply with a channel to be used for support messages. (#channel)' +
				commandTimeoutMessage
		);
		const collectA1 = await message.channel.awaitMessages(m => m.author.id == message.author.id, messageCollectionConfig);
		const supportChannel = collectA1.first().content;
		message.channel.send(`You have chosen: ${supportChannel}. Is that correct? (yes/no)` + commandTimeoutMessage);

		const collectAnswer = await message.channel.awaitMessages(m => m.author.id == message.author.id, messageCollectionConfig);
		if (!collectAnswer) throw new Error(errorTimeoutMessage);
		if (collectAnswer.first().content.toLowerCase() === 'yes') {
			const supportChannelID = supportChannel.slice(2, -1);
			const serverToEdit = await ServerInfo.findOne({ guildID: message.guild.id });
			serverToEdit.supportChannelID = supportChannelID;
			await serverToEdit.save();

			message.channel.send(`Your server is now registered within our database with the following information:`);
			await message.channel.send(
				`Guild Name: ${message.guild.name}, Guild ID: ${message.guild.id}, Support Channel: <#${supportChannelID}>`
			);
		} else {
			throw new Error();
		}
	} catch (error) {
		message.channel.send(error.message ? error.message : 'Command aborted.');
	}
};
