const axios = require('axios')
const config = require('../config.json')

const cache={}

module.exports = async function weather(city) {
	city=city.toLowerCase()
	try {
		let r
		if ((city in cache) && (Date.now()-cache[city].time>7200000)) {//2hours
			r=cache[city].data
		}
		else {
			let res = await axios.get('http://api.apixu.com/v1/current.json', {
				params: {
					q: city,
					key: config.WEATHER_APIKEY
				}
			})
			r = res.data
			cache[city] = {
				time: Date.now(),
				data: r
			}
		}
		return `${r.location.name}, ${r.location.country}
${r.current.condition.text}
Temprature: ${r.current.temp_c}℃ ${r.current.temp_f}℉
`
	}
	catch (e) {
		return null
	}
}