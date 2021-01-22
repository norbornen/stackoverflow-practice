// @ts-check

const mailer = require('./transport')

const message = {        
  to: 'example@example.com',
  subject: 'Congratulations! You are successfully registred on our site',
  text: `Поздравляем, Вы успешно зарегистрировались на нашем сайте!
  
  данные вашей учетной записи:
  login: loll
  password: lolll
  
  Данное письмо не требует ответа.`
}
mailer(message, () => {}) 
