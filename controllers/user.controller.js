/* TODO:
    - new √
    - create
    - validate
    - login
    - doLogin
    - logout
    - profile
*/

const Player = require('../models/users/player.model')
const Club = require('../models/users/club.model')
const Sport = require('../models/sport.model')
const mongoose = require('mongoose');

module.exports.new = (_, res) => {
  Sport.find()
    //it returns an array of sports
    .then(sport => {
      //put all the sports in "sports" array
      const sports = sport.map()
    })
  res.render('players/new', { user: new User() })
}

module.exports.create = (res, req, next) => {
  const player = new User({
    name: req.body.name,
    surname: req.body.surname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    photo: req.file ? req.file.url : undefined
  })
}