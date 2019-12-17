const Club = require('../models/users/club.model')
const Base = require('../models/users/base.model')
const mongoose = require('mongoose');

const mailer = require('../config/mailer.config');


module.exports.new = (_, res) => {
  res.render('clubs/form', { 
    user: new Club,
    type: 'Club'
  })
}

module.exports.create = (req, res, next) => {
  const user = new Club({
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    email: req.body.email,
    password: req.body.password,
    openingTime: Number((req.body.openingTime).slice(0,2)),
    closingTime: Number((req.body.closingTime).slice(0,2)),
    photo: req.file ? req.file.url : undefined
  })

  user.save()
    .then(user => {
      mailer.sendValidateEmailForClub(user)
      mailer.sendClubRequestToAdmin(user)
      req.session.genericSuccess = "An email has been sent"
      res.redirect('/login')
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('clubs/form', { 
          user, 
          error: error.errors 
        })
      } else {
        next(error);
      }
    })
}

module.exports.validate = (req, res, next) => {
  Base.findOne({ activationToken: req.params.token })
    .then(user => {
      if (user) {
        mailer.validateClub(user)
        user.validated = true
        user.save()
          .then(() => {
            res.redirect('/login')
          })
          .catch(next)
      } else {
        res.redirect('/')
      }
    })
    .catch(next)
}

module.exports.profile = (req, res, next) => {
  const user = req.session.user
  const username = req.params.username

  if (user.username === username) {
    res.render('clubs/index', {user: req.currentUser})
  } else {
    next(error)
  }
}
