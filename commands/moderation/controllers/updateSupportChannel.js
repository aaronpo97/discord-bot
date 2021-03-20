const errorTimeoutMessage = 'The command timed out. Please try again.';

const messageCollectionConfig = { max: 1, time: 10000 };
const commandTimeoutMessage = `\nThis command will timeout after ${(messageCollectionConfig.time / 1000).toFixed(2)} ${
	messageCollectionConfig.time / 1000 === 1 ? 'second' : 'seconds'
}.`;

module.exports = async (message, queriedServerInfo) => {
	try {
		message.channel.send(
			`Your server is already registered within our database. Would you like to update the information? (Yes/No)` +
				commandTimeoutMessage
		);

		const awaitQOne = await message.channel.awaitMessages(m => m.author.id == message.author.id, messageCollectionConfig);
		if (!awaitQOne.first()) throw new Error(errorTimeoutMessage);
		if (awaitQOne.first().content.toLowerCase() === 'yes') {
			message.reply(
				`The channel being used for support messages is: <#${queriedServerInfo.supportChannelID}>. Is this correct? (Yes/No)` +
					commandTimeoutMessage
			);
		} else throw new Error();

		const awaitQTwo = await message.channel.awaitMessages(m => m.author.id == message.author.id, messageCollectionConfig);
		if (!awaitQTwo.first()) throw new Error(errorTimeoutMessage);
		if (awaitQTwo.first().content.toLowerCase() === 'no') {
			message.channel.send('Please indicate the new support channel. (#channel)' + commandTimeoutMessage);
		} else throw new Error();

		const awaitQThree = await message.channel.awaitMessages(m => m.author.id == message.author.id, messageCollectionConfig);
		if (!awaitQThree) throw new Error(errorTimeoutMessage);
		if (!awaitQThree.first()) throw new Error(errorTimeoutMessage);

		const updatedSupportChannel = awaitQThree.first().content;
		message.channel.send(
			`You chose: ${updatedSupportChannel}. Please confirm this is the channel you want. (Yes/No)` + commandTimeoutMessage
		);

		const awaitQFour = await message.channel.awaitMessages(m => m.author.id == message.author.id, messageCollectionConfig);
		if (!awaitQFour) throw new Error(errorTimeoutMessage);
		if (awaitQFour.first().content.toLowerCase() === 'yes') {
			message.channel.send(`Great! The support channel is now ${updatedSupportChannel} `);
			queriedServerInfo.supportChannelID = updatedSupportChannel.slice(2, -1);
			await queriedServerInfo.save();
		} else throw new Error();
	} catch (error) {
		console.log(error.name);
		message.channel.send(error.message ? error.message : 'Command aborted.');
	}
};
