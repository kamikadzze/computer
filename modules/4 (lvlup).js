module.exports.run = async (message, z, emitted, locale) => {

if(!message.prefix && (!emitted || (emitted && emitted == 0))) {
if(Comp.unxp.has(message.author.id) || message.channel.id == '693046024146518107') return
let loc = locale('events', 'message'),
row = await Comp.models.get('XP').findOne({id: message.author.id})
if(row && (row.xp + message.xp) >= Comp.xpFormule(row.lvl)) {
message.channel.send(new Comp.Discord.MessageEmbed()
.setTitle(loc[1])
.setColor('BLURPLE')
.addField(loc[2], row.lvl + 1)).then(msg => msg.delete({timeout: 5500}))
}}
}