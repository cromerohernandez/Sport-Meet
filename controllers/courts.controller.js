/* TODO:
    - add
    - create
*/

const Court = require('../models/court.model')
const Club = require('../models/users/club.model')
const Sport = require('../models/sport.model')

module.exports.new = (req, res, next) => {  
  const user = req.session.user
  const name = req.params.name
  const title = {
    firstWord: 'Add',
    secondWord: 'Court',
  }
  if (user.name === name) {
    Sport.find({})
      .then(sports => {
        res.render('courts/new', {
          title,
          user,
          sports
        })
      })
  }
}

module.exports.add = (req, res, next) => {
  const user = req.session.user
  const { courtName, sport, indoorOrOutdoor } = req.body
  const title = {
    firstWord: 'Add',
    secondWord: 'Court',
  }
  if(!courtName){
    res.redirect(`/clubs/${user.name}/courts/new`)
  } else {
    const court = new Court({
      club: user._id,
      name: courtName,
      sports: sport,
      indoorOrOutdoor: indoorOrOutdoor
    })
    console.log(court)
    court.save()
      .then(court => {
        req.session.genericSuccess = `${court.name} has been added to your club!`
        res.redirect(`/clubs/${user.name}/courts/new`)
      })
  }
}