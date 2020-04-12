module.exports.info = {
name: 'ранк',
engname: 'rank',
regex: '/[рт][ау]н[кг]/',
engregex: '/r[au]n[kg]/',
args: '[человек]',
engargs: '[member]',
desc: 'Показать свой или чужой XP',
engdesc: 'Show your or alien XP',
}
module.exports.run = async (message, ph) => {
let user
if(message.args[0]) user = Comp.client.users.cache.get(message.args[0]) || message.mentions.users.first()
if(!user) user = message.author
const rcard = async (row, length, timer) => {
message.channel.startTyping()
const {Canvas} = require('canvas-constructor')
Comp.jimp.read(user.avatarURL({format: 'png'})).then(async avatar => {
await Comp.jimp.read('./assets/avatarmask.png').then(async mask => {
await avatar.resize(200, 200).mask(mask, 0, 0)
await Comp.jimp.read('./assets/bgmask.png').then(async bgmask => {
await Comp.jimp.read(row.bg).then(async bg => {
await bg.resize(934, 282).blur(5).mask(bgmask)
await Comp.jimp.read(new Canvas(700, 20).setColor('#' + bg.getPixelColor(96, 100).toString(16).slice(0, -2)).addRect(0, 0, Math.ceil(length), 20).toBuffer()).then(async bar => {
await Comp.jimp.read('./assets/xpmask.png').then(async xpmask => await bar.mask(xpmask.resize(700, 20), 0, 0))
await bar.resize(634, 40); if(user.id == Comp.owners.stalin) await Comp.jimp.read('./assets/staff.png').then(async sicon => await bg.composite(sicon, 55, 5))
await Comp.jimp.read('./assets/'+user.presence.status+'.png').then(async status => await avatar.composite(status, 141, 151))
await Comp.jimp.loadFont('./fonts/uni-sans-heavy-64-white.fnt').then(async fnt => {
await bg
.composite(avatar, 50, 50)
.composite(bar, 255, 210)
.print(fnt, 255, 146, user.tag)
.print(fnt, 655, 0, 'lvl: ' + row.lvl)
.print(fnt, 350, 50, row.xp + '/' + Comp.xpFormule(row.lvl) + ' xp')
.print(fnt, 245, 0, 'money:$' + row.money)
.getBuffer(Comp.jimp.MIME_PNG, async(err, buff) => {
await message.channel.stopTyping();
message.channel.send('Made for ' + Math.ceil((Date.now() - timer) / 1000) + ' seconds ', {files: [await new Comp.Discord.MessageAttachment(buff, 'rank.png')]})})})})})})})})}
const row = Comp.DB.xp.get(user.id)
if(!row) return message.reply(ph[0])
if(!['prev', 'preview'].includes(message.args[0])) rcard(row, row.xp / (Comp.xpFormule(row.lvl) / 100) * 7, Date.now())
else rcard({bg: 'https://cdn.mee6.xyz/plugins/levels/cards/backgrounds/4cc81b4c-c779-4999-9be0-8a3a0a64cbaa.jpg', money: 228000, lvl: 12, xp: 769}, ((769 / ((5 * (12 ^ 2) + 50 * 12 + 100) / 100)) * 7), Date.now())
}