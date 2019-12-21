const Base = require('../models/users/base.model')
const mongoose = require('mongoose');

module.exports.index = (req, res, next) => {
  const title = {
    firstWord: 'Sport',
    secondWord: 'Meet'
  }

  Base.findById(req.currentUser._id)
    .then(user => {
      if (!user) {
        res.render('login', {title})     
      } else if (user.__type === 'Club'){
        res.redirect(`/clubs/${user.name}`)
      } else {
        res.redirect(`/players/${user.username}`)
      }
    })
    .catch(error => next(error))

}

// render the home page
module.exports.login = (_, res) => {
  const title = {
    firstWord: 'Sport',
    secondWord: 'Meet'
  }
  res.render('login', {title})
}

module.exports.doLogin = (req, res, next) => {

  const title = {
    firstWord: 'Sport',
    secondWord: 'Meet'
  }

  const { email, password } = req.body

  if (!email || !password) {
    return res.render('login', {
      user: req.body,
      error: { password: 'invalid email or password' },
      title
    })
  }

  Base.findOne({ email: email, validated: true })

    .then(user => {
      if (!user) {
        res.render('login', {
          user: req.body,
          error: { password: 'invalid email or password' },
          title
        })
      } else {
        return user.checkPassword(password)
          .then(match => {
            if (!match) {
              res.render('login', {
                user: req.body,
                error: { password: 'invalid email or password' },
                title
              })
            } else {
              req.session.user = user;
              if (user.__type === 'Club'){
                res.redirect(`/clubs/${user.name}`)
              } else {
                res.redirect(`/players/${user.username}`)
              }
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

module.exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
}