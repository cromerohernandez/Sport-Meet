/* TODO:
    - new √
    - create √
    - validate √
    - login √
    - doLogin √
    - logout √
    - profile √
    - add sport
    - new request
*/

const Player = require('../models/users/player.model')
const Base = require('../models/users/base.model')
const Sport = require('../models/sport.model')
const mongoose = require('mongoose');

const mailer = require('../config/mailer.config');

module.exports.new = (_, res) => {

  Sport.find()
    //it returns an array of sports
    .then(sports => {
      const data = {
        sports,
        user: new Player()
      }
      res.render('players/form', data)
    })
    .catch(error => next(error))
}

module.exports.create = (req, res, next) => {
  const user = new Player({
    name: req.body.name,
    surname: req.body.surname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    photo: req.file ? req.file.url : undefined
  })

  user.save()
    .then(user => {
      mailer.sendValidateEmail(user)
      res.redirect('/login')
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        // console.log(error.errors)
        res.render('players/form', { 
          user, 
          error: error.errors 
        })
      } else {
        next(error);
      }
    })
  }  

module.exports.validate = (req, res, next) => {
  Player.findOne({ activationToken: req.params.token })
    .then(user => {
      if (user) {
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

module.exports.login = (_, res) => {
  res.render('players/login')
}

module.exports.doLogin = (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.render('players/login', { user: req.body })
  }

  Player.findOne({ email: email, validated: true })

    .then(user => {
      if (!user) {
        res.render('players/login', {
          user: req.body,
          error: { password: 'invalid password' }
        })
      } else {
        return user.checkPassword(password)
          .then(match => {
            if (!match) {
              res.render('players/login', {
                user: req.body,
                error: { password: 'invalid password' }
              })
            } else {
              req.session.user = user;
              req.session.genericSuccess = 'Welcome!'
              res.redirect('/');
            }
          })
      }
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('players/login', {
          user: req.body,
          error: error.errors
        })
      } else {
        next(error);
      }
    });
}

module.exports.profile = (req, res, next) => {
  const user = req.session.user
  const username = req.params.username
  if (user.username === username) {
    res.render('players/index', {user: req.currentUser})
  } else {
    next(error)
  }
}