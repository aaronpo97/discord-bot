require('colors');
const mongoose = require('mongoose');
const path = require('path');
const { licenseDisclaimer } = require('./miscUtil');

module.exports = async client => {
	try {
		client.registry
			.registerGroups([
				['moderation', 'mod commands'],
				['misc', 'misc commands'],
				['utility', 'Utility commands.'],
			])
			.registerDefaults()
			.registerCommandsIn(path.join(__dirname, 'commands'));

		const validStatusType = ['online', 'invisible', 'dnd', 'idle'];

		let status = process.argv[2];
		if (!validStatusType.includes(status)) status = 'online';
		client.user.setStatus(status);

		console.log('\n');
		licenseDisclaimer();

		await mongoose.connect(process.env.MONGO_SERVER_LINK, { useNewUrlParser: true, useUnifiedTopology: true });

		console.log('MongoDB connection established. \n');

		console.log(`${client.user.tag.red} is now live. \n`);
		console.log(`Now connected to:`);
		client.guilds.cache.forEach(guild => console.log(guild.name));
		console.log(`\nStatus set to ${status == 'online' ? status.green : status.red}.`);
	} catch (error) {
		console.log('Something went wrong: ' + error.stack);
	}
};
