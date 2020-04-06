module.exports.run = () => {

console.log('Запуск клиента...')

Comp.client.prefixes = ['товарищ', 'таварищ', 'таварищь', 'товарищь', `<@${Comp.client.user.id}>`, 'comrade', 'comrad', 'c.', 'к.']
Comp.client.user.setActivity(`${Comp.client.prefixes[0]} помогай | ЭВМ им. Сталина.`)

Comp.client.stats = {cmds: {total: 0, perHour: 0}, users: {users: Comp.client.users.filter(u => !u.bot).size, bots: Comp.client.users.filter(u => u.bot).size}, msgs: 0}
Comp.client.glangs = []
Comp.client.ignores = []
Comp.client.commands = []

Comp.fs.readdir('./cmds', (err, cmds) => {
let i = 0
if (err) throw err
cmds.forEach(comad => {
if(comad.startsWith('-')) return
i++
const cmmd = require(`../cmds/${comad}`)
Comp.client.commands.push({
name: cmmd.info.name,
engname: cmmd.info.engname || cmmd.info.name,
regex: cmmd.info.regex.toString().slice(1, -1),
engregex: cmmd.info.engregex?cmmd.info.engregex.toString().slice(1, -1):'',
args: cmmd.info.args,
engargs: cmmd.info.engargs,
desc: cmmd.info.desc,
engdesc: cmmd.info.engdesc,
run: message => require('../cmds/'+comad).run(message, Comp.locales[message.lang][(cmmd.info.engname?cmmd.info.engname:cmmd.info.name).toLowerCase()]),
engrun: cmmd.engrun || cmmd.run,
private: cmmd.info.private || false,
hidden: cmmd.info.hidden || false,
uses: 0
})
console.log('Загружена команда', (cmmd.info.engname || cmmd.info.name))
})
Comp.client.commands.push({regex: 's(et)?(-)?lang(uage)?|у(ст[оа]н[ао]вить)?(-)?я(зы[кг])?', hidden: true, uses: 0})
Comp.client.commands.push({regex: 'п[оа]м[оа]г[аи]й?|hel{1,}[pb]', hidden: true, uses: 0})
console.log('Загружено', i, Comp.declOfNum(i, ['команда', 'команды', 'команд']))
})

console.log('Клиент запущен')
}