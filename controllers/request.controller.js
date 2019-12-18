/* TODO:
    - new
    - create
*/

const Request = require('../models/request.model')
const Player = require('../models/users/player.model')
const Club = require('../models/users/club.model')  

module.exports.selectSport = (req, res, next) => {
  const user = req.session.user
  const username = req.params.username
  const title = {
    firstWord: 'New',
    secondWord: 'Request',
  }

  if (user.username === username) {
    Player.findOne({username: user.username})
    .populate('sports')
    .then(user => {
      if (user.sports.length === 0) {
        req.session.genericError = "You don't have any favourite sport yet. Add at least one sport"
        res.redirect(`/players/${username}/sports/new`)
      } else {
        const sports = user.sports
        res.render('requests/selectSport', {
          title,
          user,
          sports,
        })
      }
    })
  }
}

module.exports.new = (req, res, next) => {
  const user = req.session.user
  const username = req.params.username
  const sport = req.params.sport
  const title = {
    firstWord: `${sport.name}`,
    secondWord: 'Request',
  }

  if (user.username === username) {
    Player.findOne({username: user.username})
    .populate('sports')
    .then(user => {
      if (user.sports.length === 0) {
        req.session.genericError = "You don't have any favourite sport yet. Add at least one sport"
        res.redirect(`/players/${username}/sports/new`)
      } else {
        const sport = user.sports
        Club.find()
        .then(clubs => {
          res.render('requests/new', {
            title,
            user,
            sport,
            clubs
          })
        })
      }
    })
  }
}
