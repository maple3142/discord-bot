const axios = require('axios')
const config = require('../config.json')

module.exports = async function youtube(search) {
	let res = await axios.get('https://www.googleapis.com/youtube/v3/search', {
		params: {
			q: search,
			part: 'snippet',
			key: config.YOUTUBE_APIKEY
		}
	})
	let text = ''
	res.data.items.forEach(video => {
		if (video.id.kind === 'youtube#video') {
			text += `https://youtu.be/${video.id.videoId}\n`
		}
	})
	return text
}