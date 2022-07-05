const {Telegraf, session, Scenes: {BaseScene, Stage}, Markup} = require('telegraf')
const nodemailer = require('nodemailer')

// описуємо 
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'adolf.alfaclinton@gmail.com',
      pass: '9TFMHJACHt5K_',
    },
  })

// створуємо сцени для розмови з клієнтом

// сцена яка запитує ПІБ
const PIB = new BaseScene('PIB')
PIB.enter( (ctx) => {ctx.reply('Вкажіть ваш ПІБ')})
PIB.on('text', (ctx) => {
    ctx.session.pib = ctx.message.text
    return ctx.scene.enter('title')
})
PIB.leave()

// сцена яка запитує тематику проблеми
const title = new BaseScene('title')

title.enter((ctx) => { 
ctx.reply('Вкажіть тематику проблеми з цього списку:\n- Програмна\n- Апаратна\n- Інше')
})
title.on('text', (ctx) => {
    ctx.session.title = ctx.message.text
    return ctx.scene.enter('text_problem')
})
title.leave()
// сцена яка запитує деталі пробелми
const text_problem = new BaseScene('text_problem')

text_problem.enter( (ctx) => {
     ctx.reply('Будь ласка детальніше опишіть свою проблему')
})
text_problem.on('text',  (ctx) => {
    ctx.session.text_problem = ctx.message.text
    return ctx.scene.enter('all_text')
})

text_problem.leave()
// друг того що користувач ввів
const all_text = new BaseScene('all_text')

all_text.enter( (ctx) => {
    ctx.reply(`Ваш ПІБ: ${ctx.session?.pib}.\nПроблема: ${ctx.session?.title}.\nДетальний опис: 
    ${ctx.session?.text_problem}.\nДля створення заявки з цією проблемою на дошці Help desk 
    введіть команду /send`)
    return ctx.scene.leave()

})

// ініціалізція бота
const bot = new Telegraf("1805118291:AAEzGDnpm9AMVVLpGNym6FgCJmObevx-3eI")

const stage = new Stage([PIB, title, text_problem, all_text])

bot.use(session())
bot.use(stage.middleware())

bot.start((ctx) => ctx.reply('Привіт, я бот для занесення завдань в Help Desk.\nВведіть команду /ask для подальшої взаємодії'))

// опис дій на команди
bot.hears('creator', (ctx) => ctx.reply('Чат бот був написаний by Ярута Андрій, КІ-41, 2021'))
bot.command('/ask', ctx => ctx.scene.enter('PIB'))
bot.command('/send', ctx => {
    // створення завдання в дошці хелп деск
    let result =  transporter.sendMail({
        from: `"${ctx.session?.pib}" <nodejs@example.com>`,
        to: 'yaruta.andriy@ukr.net',
        subject: `${ctx.session?.title}`,
        text: `${ctx.session?.text_problem}`
      })
      
      console.log(result)
      ctx.reply('Заявку створенно')
})

bot.launch()