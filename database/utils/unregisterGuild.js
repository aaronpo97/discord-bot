const ServerInfo = require('../schemas/ServerInfo');
const unregisterGuild = async guild => {
	const { id: guildID } = guild;
	const unregisteredServer = await ServerInfo.deleteMany({ guildID });
};

module.exports = unregisterGuild;
