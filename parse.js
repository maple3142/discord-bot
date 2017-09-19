module.exports = function parse(str) {
	let args = str.split(' ')
	let cmd = args.shift()
	if (cmd) {
		cmd = cmd.slice(1).toLowerCase() //remove "!"
	}
	return { cmd, args }
}