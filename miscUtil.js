require('colors');
const dividingLine = (symbol, num) => {
	for (let i = 0; i < num; i++) {
		process.stdout.write(symbol);
	}
};
const licenseDisclaimer = () => {
	dividingLine('*', 90);
	console.log(`\nCopyright © 2021 Aaron William Po.`);
	console.log(`This program comes with ABSOLUTELY NO WARRANTY. \n`);
	console.log(`This is free software, and you are welcome to redistribute it under certain conditions.`);
	console.log(`Visit ${`https://github.com/aaronpo97/discord-bot`.yellow} to learn more.`);
	dividingLine('*', 90);
	console.log('\n');
};

module.exports.licenseDisclaimer = licenseDisclaimer;
