const Discord = require('discord.js')
const axios = require('axios')
const client = new Discord.Client()

const config=require('./config.json')

client.on('ready', () => {
    console.log('Bot Start!')
});

client.on('message',m => {
    if(m.content.startsWith('/youtube')){
        let data={
            q: m.content.split(' ').slice(1).join(' '),
            part: 'snippet',
            key: config.YOUTUBE_APIKEY
        }
        axios.get('https://www.googleapis.com/youtube/v3/search', {
			params: data
		}).then(res=>{
			let r=''
            res.data.items.forEach(v=>{
                r+=`https://youtu.be/${v.id.videoId}\n`
            })
			m.reply(r)
        }).catch(e=>console.error(e.message))
        
    }
});

client.login(config.DISCORD_BOT_TOKEN)