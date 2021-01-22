// @ts-check
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport(
    {
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'keara.legros71@ethereal.email',
            pass: 'W3Zsu1svH9X9A4EcPC'
        }
    },
    {
        from: 'Mailer Test <keara.legros71@ethereal.email>',
    }
)
const mailer = (message, cb) => {
    transporter.sendMail(message, (err, info) => {
        if(err) return console.log(err)
        console.log('Email sent: ', info)
        cb(info)
    })
}
module.exports = mailer
