const badWords = require('./bannedWords.js');

const findBannedWords = message => {
	for (i = 0; i < badWords.length; i++) {
		if (message.content.toLowerCase().includes(badWords[i].toLowerCase())) return true;
	}
};

const automod = async message => {
	try {
		if (findBannedWords(message)) {
			const reason = 'Zero tolerance for racial slurs.';
			const target = message.author;
			const member = message.guild.members.cache.get(target.id);
			await message.delete();
			if (!member.bannable) {
				await message.channel.send(`There is zero tolerance for discrimination and verbal slurs.`);
			} else {
				await member.ban({ days: 7, reason: reason }); //refers to what messages to delete and what the ban reason is
				await message.channel.send(`There is zero tolerance for discrimination and verbal slurs. <@${target.id}> has been banned.`);
			}
		}
	} catch (error) {
		console.log(`Something went wrong:`, error);
	}
};

module.exports = automod;
