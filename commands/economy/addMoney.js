const Commando = require('discord.js-commando');
const Account = require('../../database/schemas/Account');
const ServerInfo = require('../../database/schemas/ServerInfo');

module.exports = class AddMoneyCommand extends Commando.Command {
	constructor(client) {
		super(client, {
			name: 'add-money',
			group: 'economy',
			memberName: 'add-money',
			description: 'Add money to your in-server economy account.',
		});
	}
	async run(message) {
		const { id: userID } = message.author;
		const { id: guildID } = message.guild;

		const currentGuild = await ServerInfo.findOne({ guildID });
		if (!currentGuild) {
			message.channel.send('Your server is not intialized in the database.');
			return;
		}

		const userAccount = await Account.findOne({ userID, guild: currentGuild._id }).populate('guild');
		if (!userAccount) {
			message.channel.send('Your in-server economy account is not initialized');
			return;
		}

		await message.channel.send(`Your old balance was ${userAccount.balance} units.`);
		const amountToAdd = Math.floor(Math.random() * 100 + 1);
		userAccount.balance += amountToAdd;
		await userAccount.save();
		await message.channel.send(`You received ${amountToAdd} units. Your balance is now ${userAccount.balance}.`);
	}
};
