const updateServerInfo = (findServer, message) => {
	message.channel.send('Your server is already registered within our database. Would you like to update the information? (Yes/No)');
	message.channel
		.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 30000 })
		.then(collected => {
			// only accept messages by the user who sent the command
			// accept only 1 message, and return the promise after 30000ms = 30s

			// first (and, in this case, only) message of the collection
			if (collected.first().content.toLowerCase() == 'yes') {
				message.reply(`The channel being used for support messages is: <#${findServer.supportChannelID}>. Is this correct?`);
				message.channel
					.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 30 * 1000 })
					.then(collected => {
						if (collected.first().content.toLowerCase() === 'no') {
							message.channel.send('Please indicate the new support channel. ');
							message.channel
								.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 30 * 1000 })
								.then(collected => {
									const updatedSupportChannel = collected.first().content;
									message.channel.send(`You have chosen: ${updatedSupportChannel}. Is that correct?`);
									message.channel
										.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 30 * 1000 })
										.then(async collected => {
											if (collected.first().content.toLowerCase() === 'yes') {
												message.channel.send('Great!');
												message.channel.send(`The support channel is now ${updatedSupportChannel} `);
												findServer.supportChannelID = updatedSupportChannel.slice(2, -1);
												await findServer.save();
												return;
											} else return;
										});
								});
						} else return;
					});
			}
			message.reply('Operation canceled.');
			return;
		})
		.catch(error => {
			message.reply('No answer after 30 seconds, operation canceled.');
			console.log(error);
			return;
		});
};

module.exports = updateServerInfo;
