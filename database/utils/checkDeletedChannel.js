const ServerInfo = require('../schemas/ServerInfo');
module.exports = async channel => {
	const { id: channelID } = channel;
	const { id: guildID } = channel.guild;

	console.log(guildID, channelID);
	const serverInfo = await ServerInfo.findOne({ guildID });

	if (!serverInfo) return;

	const { supportChannelID } = serverInfo;
	if (!supportChannelID || supportChannelID !== channelID) return;
	if (supportChannelID === channelID) {
		serverInfo.supportChannelID = null;
		await serverInfo.save();
	} else return;
};
