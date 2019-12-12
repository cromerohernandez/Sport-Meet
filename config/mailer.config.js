const nodemailer = require('nodemailer');

const APP_HOST = process.env.APP_HOST || 'http://localhost:3000'

const user = process.env.MAIL_USER
const pass = process.env.MAIL_PASS

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user, pass }
});

module.exports.sendValidateEmail = (targetUser) => {
  transporter.sendMail({
    from: `"SportMeet" <${user}>`,
    to: targetUser.email,
    subject: 'Welcome to SportMet!',
    html: `
      <h1>Welcome</h1>
      <a href='${APP_HOST}/players/${targetUser.activationToken}/validate'>Confirm account</a>
    `
  })
    .then(info => console.log(info))
    .catch(error => console.log(error))
}