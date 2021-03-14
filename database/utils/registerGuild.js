const ServerInfo = require('../schemas/ServerInfo');
const registerGuild = async guild => {
	const { id: guildID, name } = guild;

	const addedServer = new ServerInfo({
		name,
		guildID,
		supportChannelID: null,
	});
	await addedServer.save();
	console.log(addedServer);
};

module.exports = registerGuild;
