const ServerInfo = require('../schemas/ServerInfo');
module.exports = async guild => {
	const { id: guildID } = guild;
	const unregisteredServer = await ServerInfo.deleteMany({ guildID });
};
