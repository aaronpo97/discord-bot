const ServerInfo = require('../../../database/schemas/ServerInfo');
const errorTimeoutMessage = 'The command timed out. Please try again.';

const messageCollectionConfig = { max: 1, time: 10000 };
const commandTimeoutMessage = `\nThis command will timeout after ${(messageCollectionConfig.time / 1000).toFixed(2)} ${
	messageCollectionConfig.time / 1000 === 1 ? 'second' : 'seconds'
}.`;

module.exports.updateSupportChannel = async (message, serverInfo) => {
	try {
		message.channel.send(
			`Your server is already registered within our database. Would you like to update the information? (Yes/No)` +
				commandTimeoutMessage
		);

		const awaitQOne = await message.channel.awaitMessages(
			m => m.author.id == message.author.id,
			messageCollectionConfig
		);
		if (!awaitQOne.first()) throw new Error(errorTimeoutMessage);
		if (awaitQOne.first().content.toLowerCase() === 'yes') {
			message.reply(
				`The channel being used for support messages is: <#${serverInfo.supportChannelID}>. Is this correct? (Yes/No)` +
					commandTimeoutMessage
			);
		} else throw new Error();

		const awaitQTwo = await message.channel.awaitMessages(
			m => m.author.id == message.author.id,
			messageCollectionConfig
		);
		if (!awaitQTwo.first()) throw new Error(errorTimeoutMessage);
		if (awaitQTwo.first().content.toLowerCase() === 'no') {
			message.channel.send('Please indicate the new support channel. (#channel)' + commandTimeoutMessage);
		} else throw new Error();

		const awaitQThree = await message.channel.awaitMessages(
			m => m.author.id == message.author.id,
			messageCollectionConfig
		);
		if (!awaitQThree) throw new Error(errorTimeoutMessage);
		if (!awaitQThree.first()) throw new Error(errorTimeoutMessage);

		const updatedSupportChannel = awaitQThree.first().content;
		message.channel.send(
			`You have chosen: ${updatedSupportChannel}. Is that correct? (Yes/No)` + commandTimeoutMessage
		);

		const awaitQFour = await message.channel.awaitMessages(
			m => m.author.id == message.author.id,
			messageCollectionConfig
		);
		if (!awaitQFour) throw new Error(errorTimeoutMessage);
		if (awaitQFour.first().content.toLowerCase() === 'yes') {
			message.channel.send(`Great! The support channel is now ${updatedSupportChannel} `);
			serverInfo.supportChannelID = updatedSupportChannel.slice(2, -1);
			await serverInfo.save();
		} else throw new Error();
	} catch (error) {
		console.log(error.name);
		message.channel.send(error.message ? error.message : 'Command aborted.');
	}
};

module.exports.initSupportChannel = async message => {
	try {
		message.channel.send(
			'To initialize the support command, reply with a channel to be used for support messages. (#channel)'
		);
		const collectA1 = await message.channel.awaitMessages(
			m => m.author.id == message.author.id,
			messageCollectionConfig
		);
		const supportChannel = collectA1.first().content;
		message.channel.send(`You have chosen: ${supportChannel}. Is that correct? (yes/no)`);

		const collectAnswer = await message.channel.awaitMessages(
			m => m.author.id == message.author.id,
			messageCollectionConfig
		);
		if (!collectAnswer) throw new Error(errorTimeoutMessage);
		if (collectAnswer.first().content.toLowerCase() === 'yes') {
			const supportChannelID = supportChannel.slice(2, -1);
			const serverToEdit = await ServerInfo.findOne({ guildID: message.guild.id });
			serverToEdit.supportChannelID = supportChannelID;
			await serverToEdit.save();

			message.channel.send(`Your server is now registered with our database with the following information:`);
			await message.channel.send(
				`Guild Name: ${message.guild.name}, Guild ID: ${message.guild.id}, Support Channel: <#${supportChannelID}>`
			);
		} else {
			throw new Error();
		}
	} catch (error) {
		console.log(error.name);
		message.channel.send(error.message ? error.message : 'Command aborted.');
	}
};
