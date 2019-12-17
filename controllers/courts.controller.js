/* TODO:
    - add
    - create
*/

const Club = require('../models/users/club.model')
const Sport = require('../models/sport.model')

module.exports.new = (req, res, next) => {  
  const user = req.session.user
  const name = req.params.name
  const title = {
    firstWord: 'Add',
    secondWord: 'Court',
  }
  if (user.name === name  && user.__type === 'Club') {
    Sport.find({})
      .then(sports => {
        res.render('courts/new', {
          title,
          sports
        })
      })
  }
}

// module.exports.new = (req, res, next) => {
//   const user = req.session.user
//   const username = req.params.username
//   const title = {
//     firstWord: 'New',
//     secondWord: 'Request',
//   }

//   if (user.username === username  && user.__type === 'Player') {
//     Player.findOne({username: user.username})
//     .populate('sports')
//     .populate('club')
//     .then(user => {
//       if (user.sports.length === 0) {
//         req.session.genericError = "You don't have any favourite sport yet. Add at least one sport"
//         res.redirect(`/players/${username}/sports/new`)
//       } else {
//         const sport = user.sports
//         const club = user.club
//         res.render('requests/new', {
//           title,
//           user,
//           sport,
//           club
//         })
//       }
//     })
//   }
// }