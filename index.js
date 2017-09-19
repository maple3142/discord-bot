const Discord = require('discord.js')

const client = new Discord.Client()

const parse = require('./parse')

const config = require('./config.json')

client.on('ready', () => {
	console.log('Bot Start!')
});

client.on('message', async m => {
	let cmd = parse(m.content)
	if (cmd.cmd === 'youtube') {
		let search = cmd.args.join(' ')
		let result=await require('./cmds/youtube')(search)
		m.reply(result)
	}
	if (cmd.cmd === 'weather') {
		let search = cmd.args.join(' ')
		let result = await require('./cmds/weather')(search)
		m.reply(result?result:'City not found')
	}
})

client.login(config.DISCORD_BOT_TOKEN)