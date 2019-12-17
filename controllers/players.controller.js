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

const createError = require('http-errors');
const Player = require('../models/users/player.model')
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
      req.session.genericSuccess = "A validation email has been sent"
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
        next(error)
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
            req.session.genericSuccess = "Your account has been validated!"
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
              req.session.user = user
              req.session.genericSuccess = 'Welcome!'
              res.redirect('/')
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
        next(error)
      }
    });
}

module.exports.profile = (req, res, next) => {
  const user = req.session.user
  const username = req.params.username
  if (user.username === username) {
    res.render('players/index', {user: req.currentUser})
  } else {
    res.redirect(`/players/${user.username}`)
  }
}

module.exports.newSport = (req, res, next) => {
  const user = req.session.user
  const username = req.params.username
  const title = {
    firstWord: 'Handle',
    secondWord: 'Sports'
  }

  if (user.username === username) {

    Sport.find()
      .then(sport => {
        res.render('sports/new', {
          user,
          sport,
          title
        })
      })
      .catch(error => next(error))
  }
}

module.exports.addNewSport = (req, res, next) => {
  const user = req.session.user
  const { body } = req

  Player.findOne({username: user.username})
    .then(user => {
      if (!user.sports.includes(body.sport)){
        console.log(req.body)
        Player.findByIdAndUpdate(
          user._id,
          {
            $push: { sports: body.sport }
          },
          {new: true}
        )
        .populate('sports')
        .then((user) => {
          const addedSport = user.sports.reduce((_, sport) => {
            if (sport.id === body.sport) {
              return sport.name
            }
          }, '')
          req.session.genericSuccess = `'${addedSport}' has been added on your list!`
          res.redirect(`/players/${user.username}/sports/new`)
        })
        .catch(error => next(error))
      } else {
        Player.findOne({username: user.username})
        .populate('sports')
        .then(user => {
          const allSports = user.sports.map(sports => {
            return sports.name
          })
          req.session.genericError = `This sport is already on your list.
            Your favorite sports are: ${allSports}`
          res.redirect(`/players/${user.username}/sports/new`)
        })
        .catch(error => next(error))
      }
    })
}

