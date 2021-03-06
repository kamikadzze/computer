module.exports.run = () => {
Comp.log('intervals', 'Interval module initialization...')

Comp.cmdPH = setInterval(() => Comp.client.stats.cmds.perHour = 0, 3600000)

Comp.RS = setInterval(() => {
if(!Comp.client.stats) return
Comp.cpuse.usageAvg().then(i => Comp.client.stats.cpu = i)
Comp.client.stats.users = {users: Comp.client.users.cache.filter(u => !u.bot).size, bots: Comp.client.users.cache.filter(u => u.bot).size}
let i = 0,
status = [`ЭВМ ${Comp.beta?'бета':'им. Сталина.'}`, `${Comp.declOfNum(Comp.client.stats.users.users, ['товарищ', 'товарища', 'товарищей'], 1)}`]
if(Comp.client.user.presence.activities[0].name.includes(`${Comp.client.prefixes[0]} помогай | ${status[0]}`)) i = 1
Comp.client.user.setActivity(`${Comp.client.prefixes[0]} помогай | ` + status[i], {type: 'PLAYING'})
}, 5000)

Comp.cStat = setInterval(() =>
Comp.client.channels.cache.get('695980819650576384').messages.fetch(Comp.beta?'698508253205889144':'695981096202010654').then(msg => 
msg.edit(new Comp.Embed()
.setTitle(`${Comp.beta?'[BETA] ':''}Бот ${Comp.client.user.username}`)
.setThumbnail(Comp.client.user.avatarURL({format: 'png'}))
.addField('Пинг', `${Comp.addCommas(Math.round(Comp.client.ws.ping))} мс`, true)
.addField('ОЗУ', `${(process.memoryUsage().rss / 1024 / 1024 / 1024).toFixed(2)} / ${Math.floor(Comp.os.totalmem() / 1024 / 1024 / 1024)} ГБ`, true)
.addField('Процессор', Comp.client.stats.cpu, true)
.addField('Команд', 'Всего: ' + Comp.client.commands.cache.size + '\nВидны и нет ограничения прав: ' + Comp.client.commands.cache.filter(c => !c.info.private && !c.info.hidden).size + '\nСтраниц в команде помощи: ' + Comp.addCommas(Math.ceil(Comp.client.commands.cache.filter(c => !c.info.hidden).size / 15)), true)
.addField('Использованных команд', Comp.addCommas(Comp.client.stats.cmds.total), true)
.addField('Команды за час', Comp.addCommas(Comp.client.stats.cmds.perHour), true)
.addField('Сообщений', Comp.addCommas(Comp.client.stats.msgs), true)
.addField('Товарищей', Comp.addCommas(Comp.client.users.cache.size) + ` всего (${Comp.declOfNum(Comp.client.stats.users.users, ['товарищ', 'товарища', 'товарищей'], 1)}, ${Comp.declOfNum(Comp.client.stats.users.bots, ['бот', 'бота', 'ботов'], 1)})`, true)
.addField('Каналов', Comp.addCommas(Comp.client.channels.cache.size), true)
.addField('Серверов', Comp.addCommas(Comp.client.guilds.cache.size), true)
.addField('Эмодзи', Comp.addCommas(Comp.client.emojis.cache.size), true)
.addField('Включенные голосовые каналы', Comp.addCommas(Comp.client.voice.connections.size), true)
.addField('Работает', `${Comp.declOfNum(Math.floor(Comp.client.uptime / (1000 * 60 * 60)), ['час', 'часа', 'часов'], 1)} и ${Comp.declOfNum(Math.round(Comp.client.uptime / (1000 * 60)) % 60, ['минуту', 'минуты', 'минут'], 1)}`, true)
.addField('Включен',Comp.client.readyAt.toLocaleString('ru-RU', {timeZone: 'Europe/Moscow', hour12: false}) + ' MSK', true)
.addField('Московское время', new Date(Date.now()).toLocaleString('ru-RU', {timeZone: 'Europe/Moscow', hour12: false}).slice(0, -3), true)
//.addField(`Последний коммит`, '...', true)
.setColor(Comp.beta?'BLURPLE':'00fff0'))), 15000)

Comp.intDB = setInterval(async () => {
const rows = await Comp.models.get('Mute').find({})
rows.forEach(row => {
let role = Comp.client.guilds.cache.get(row.guild).roles.cache.find(r => r.name.toLowerCase().match(/(mut[ei]?)[dt]?|замучен{1,}ые/) && r.editable),
m = Comp.client.guilds.cache.get(row.guild).members.cache.get(row.id)
if(!(role && m)) return
let inmute = (row && row.inmute?row.inmute:0)
if(inmute == 1 && row && row.unmute_time && row.unmute_time <= Date.now()) inmute = 0, row.remove(), console.log('unmute')
else if(inmute == 0 && row && row.unmute_time && row.unmute_time > Date.now()) inmute = 1, row.inmute=1, row.reason=(row.reason?row.reason+'\nauto fix':'auto fix'), row.mute_time=Date.now(), console.log('mute')
row.save()
if(inmute == 0 && m.roles.cache.has(role.id)) m.roles.remove(role.id).catch(() => console.log('fuck')), console.log('remove role')
if(inmute == 1 && !m.roles.cache.has(role.id)) m.roles.add(role.id).catch(() => console.log('fuck')), console.log('add role') 
})
}, 5000)

Comp.log('intervals', 'Interval module was initialized')
}