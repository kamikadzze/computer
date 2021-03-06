module.exports.info = {
name: 'информация',
engname: 'information',
desc: 'Показывает информацию об этом боте',
engdesc: 'Shows information about this bot',
regex: 'инфо(рмация)?',
engregex: 'info(rmation)?',
}
module.exports.run = (message, ph) =>
message.channel.send(new Comp.Embed()
.setTitle(`${Comp.beta?'[BETA] ':''}${ph[0]} ${Comp.client.user.tag}`)
.setThumbnail(Comp.client.user.avatarURL({format: 'png'}))
.addField(ph[1], `${Comp.addCommas(Math.round(Comp.client.ws.ping))} ms`, true)
.addField(ph[2], `${(process.memoryUsage().rss / 1024 / 1024 / 1024).toFixed(2)} / ${Math.floor(Comp.os.totalmem() / 1024 / 1024 / 1024)} `+ph[3], true)
.addField(ph[23], Comp.client.stats.cpu, true)
.addField(ph[4], ph[5][0] + Comp.client.commands.cache.size + '\n' + ph[5][1] + Comp.client.commands.cache.filter(c => !c.info.private && !c.info.hidden).size + '\n' + ph[5][2] + Comp.addCommas(Math.ceil(Comp.client.commands.cache.filter(c => !c.info.hidden).size / 15)), true)
.addField(ph[6], Comp.addCommas(Comp.client.stats.cmds.total), true)
.addField(ph[7], Comp.addCommas(Comp.client.stats.cmds.perHour), true)
.addField(ph[8], Comp.addCommas(Comp.client.stats.msgs), true)
.addField(ph[9], Comp.addCommas(Comp.client.users.cache.size) + ` ${ph[12]} (${Comp.declOfNum(Comp.client.stats.users.users, ph[10], 1)}, ${Comp.declOfNum(Comp.client.stats.users.bots, ph[11], 1)})`, true)
.addField(ph[13], Comp.addCommas(Comp.client.channels.cache.size), true)
.addField(ph[14], Comp.addCommas(Comp.client.guilds.cache.size), true)
.addField(ph[15], Comp.addCommas(Comp.client.emojis.cache.size), true)
.addField(ph[16], Comp.addCommas(Comp.client.voice.connections.size), true)
.addField(ph[17], `${Comp.declOfNum(Math.floor(Comp.client.uptime / (1000 * 60 * 60)), ph[18], 1)} ${ph[19]} ${Comp.declOfNum(Math.round(Comp.client.uptime / (1000 * 60)) % 60, ph[20], 1)}`, true)
.addField(ph[21], Comp.client.readyAt.toLocaleString('ru-RU', {timeZone: 'Europe/Moscow', hour12: false}) + ' MSK', true)
.addField(ph[22], new Date(Date.now()).toLocaleString('ru-RU', {timeZone: 'Europe/Moscow', hour12: false}).slice(0, -3), true)
//.addField(`Последний коммит`, '...', true)
.setColor(Comp.beta?'BLURPLE':'00fff0'))