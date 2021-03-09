const ServerInfo = require('../../../schemas/ServerInfo');
const errorTimeoutMessage = 'The command timed out. Please try again.';

const messageCollectionConfig = { max: 1, time: 5000 };

module.exports.updateSupportChannel = async (message, serverInfo) => {
	try {
		message.channel.send('Your server is already registered within our database. Would you like to update the information? (Yes/No)');

		const collectOne = await message.channel.awaitMessages(m => m.author.id == message.author.id, messageCollectionConfig);
		if (!collectOne.first()) throw new Error(errorTimeoutMessage);
		if (collectOne.first().content.toLowerCase() === 'yes') {
			message.reply(`The channel being used for support messages is: <#${serverInfo.supportChannelID}>. Is this correct?`);
		} else throw new Error();

		const collectTwo = await message.channel.awaitMessages(m => m.author.id == message.author.id, messageCollectionConfig);
		if (!collectTwo.first()) throw new Error(errorTimeoutMessage);
		if (collectTwo.first().content.toLowerCase() === 'no') {
			message.channel.send('Please indicate the new support channel. ');
		} else throw new Error();

		const collectThree = await message.channel.awaitMessages(m => m.author.id == message.author.id, messageCollectionConfig);
		if (!collectThree) throw new Error(errorTimeoutMessage);
		if (!collectThree.first()) throw new Error(errorTimeoutMessage);

		const updatedSupportChannel = collectThree.first().content;
		message.channel.send(`You have chosen: ${updatedSupportChannel}. Is that correct?`);

		const collectFour = await message.channel.awaitMessages(m => m.author.id == message.author.id, messageCollectionConfig);
		if (!collectFour) throw new Error(errorTimeoutMessage);
		if (collectFour.first().content.toLowerCase() === 'yes') {
			message.channel.send(`Great! The support channel is now ${updatedSupportChannel} `);
			serverInfo.supportChannelID = updatedSupportChannel.slice(2, -1);
			await serverInfo.save();
		} else throw new Error();
	} catch (error) {
		message.channel.send(error.message ? error.message : 'Command aborted.');
	}
};

module.exports.initSupportChannel = async message => {
	try {
		message.channel.send('To initialize the support command, please indicate a channel to be used for support messages. ');
		const collectA1 = await message.channel.awaitMessages(m => m.author.id == message.author.id, messageCollectionConfig);
		const supportChannel = collectA1.first().content;
		message.channel.send(`You have chosen: ${supportChannel}. Is that correct?`);

		const collectAnswer = await message.channel.awaitMessages(m => m.author.id == message.author.id, messageCollectionConfig);
		if (!collectAnswer) throw new Error(errorTimeoutMessage);
		if (collectAnswer.first().content.toLowerCase() === 'yes') {
			const supportChannelID = supportChannel.slice(2, -1);
			const server = new ServerInfo({ name: message.guild.name, guildID: message.guild.id, supportChannelID });
			await server.save();
			message.channel.send(`Your server is now registered with our database with the following information:`);
			await message.channel.send(`Guild Name: ${message.guild.name}, Guild ID: ${message.guild.id}, Support Channel: <#${supportChannelID}>`);
		} else {
			throw new Error();
		}
	} catch (error) {
		message.channel.send(error.message ? error.message : 'Command aborted.');
	}
};
