/* TODO:
    - new
    - create
*/

const Request = require('../models/request.model')
const Player = require('../models/users/player.model')
const Base = require('../models/users/base.model')
const Sport = require('../models/sport.model')
const mongoose = require('mongoose');

module.exports.new = (req, res, next) => {
  const user = req.session.user
  const username = req.params.username
  console.log(user)
  console.log(`username => ${username}`)
  if (user.username === username && user.__type === 'Player') {

    const title = {
      firstWord: 'New',
      secondWord: 'Request',
    }

    console.log(user.sports.length)

    if (user.sports.length === 0) {
      res.redirect(`/players/${username}/sports/new`)
    } else {

    }

    res.render('requests/new', {
      user,
      title
    })
  } else {
    next(error)
  }
}