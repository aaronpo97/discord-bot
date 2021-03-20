const Commando = require('discord.js-commando');
const Account = require('../../database/schemas/Account');
const ServerInfo = require('../../database/schemas/ServerInfo');

module.exports = class EconInitCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'econ-init',
			group: 'economy',
			memberName: 'econ-init',
			description: 'Initialize an account with the in server economy system.',
		});
	}
	async run(message) {
		const { id: userID } = message.author;
		const { id: guildID } = message.guild;

		const currentGuild = await ServerInfo.findOne({ guildID });

		if (!currentGuild) return message.channel.send('sadge');

		const findUserAccount = await Account.findOne({ userID, guild: currentGuild._id });
		if (findUserAccount) {
			message.channel.send('You have already initialized your in-server economy account.');
			return;
		}

		const userAccount = new Account({ userID, balance: 40 });
		userAccount.guild = currentGuild;

		await userAccount.save();

		message.channel.send(`Your in-server economy account has been made. Here is your information: ${userAccount}`);
	}
};
