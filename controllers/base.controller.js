//to handle errors
const createError = require('http-errors');
const Base = require('../models/users/base.model')
const mongoose = require('mongoose');

// render the home page
module.exports.login = (_, res) => {
  res.render('login')
}

module.exports.doLogin = (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.render('login', { user: req.body })
  }

  Base.findOne({ email: email, validated: true })

    .then(user => {
      if (!user) {
        res.render('login', {
          user: req.body,
          error: { password: 'invalid password' }
        })
      } else {
        return user.checkPassword(password)
          .then(match => {
            if (!match) {
              res.render('login', {
                user: req.body,
                error: { password: 'invalid password' }
              })
            } else {
              const {name, surname} = user
              req.session.user = user;
              req.session.genericSuccess = 'Welcome!'
              res.redirect('/');
            }
          })
      }
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('login', {
          user: req.body,
          error: error.errors
        })
      } else {
        next(error);
      }
    });
}

module.exports.index = (req, res, next) => {
  res.render('players/index', {user: req.currentUser})
}

module.exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
}