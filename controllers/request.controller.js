/* TODO:
    - new
    - create
*/

const Player = require('../models/users/player.model')
const Base = require('../models/users/base.model')
const Sport = require('../models/sport.model')
const mongoose = require('mongoose');

module.exports.new = (req, res, next) => {
  const user = req.session.user
  const username = req.params.username
  console.log(user)
  console.log(`username => ${username}`)
  if (user.username === username) {
    const title = {
      firstWord: 'Sport',
      secondWord: 'Meet'
    }
    res.render('requests/new', {
      user,
      title
    })
  } else {
    next(error)
  }
}