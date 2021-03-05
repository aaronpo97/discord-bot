const Commando = require('discord.js-commando');

const Discord = require('discord.js');
const ServerInfo = require('../../schemas/ServerInfo');
module.exports = class InitSupportCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'support-init',
			group: 'moderation',
			aliases: ['sup-init', 'sup'],
			memberName: 'support-init',
			description: 'Initialize the support command.',
			argsType: 'single',
			clientPermissions: ['ADMINISTRATOR'],
			userPermissions: ['ADMINISTRATOR'],
		});
	}
	async run(message, args) {
		const findServer = await ServerInfo.findOne({ guildID: message.guild.id });
		if (findServer) {
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
													} else {
														message.channel.send('Command aborted');
														return;
													}
												});
										});
								} else {
									message.channel.send('Operation aborted.');
									return;
								}
							});
					} else {
						message.reply('Operation canceled.');
						return;
					}
				})

				// .then(collected => {

				// })
				.catch(error => {
					message.reply('No answer after 30 seconds, operation canceled.');
					console.log(error);
					return;
				});
		} else {
			if (!args.length) {
				message.channel.send('you didnt give any fucking arguments you idiot');
				return;
			}
			const supportChannelID = args.slice(2, -1);
			const server = new ServerInfo({ name: message.guild.name, guildID: message.guild.id, supportChannelID });
			await server.save();
			message.channel.send(`Your server is now registered with our database with the following information:`);
			await message.channel.send(`Guild Name: ${message.guild.name}, Guild ID: ${message.guild.id}, Support Channel: <#${supportChannelID}>`);
		}
		// message.channel.send(findServer);
	}
};
