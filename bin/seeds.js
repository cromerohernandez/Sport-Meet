require('../config/db.config')

const faker = require('faker')

//models
const Sport = require('../models/sport.model')
const Player = require('../models/users/player.model')
const Club = require('../models/users/club.model')
/*const Request = require('../models/request.model')*/
/*const Match = require('../models/match.model')*/

//data
const sports = require('../data/sports.json')
const clubs = require('../data/mocked/clubsAlcobendas.json')
const courts = require('../data/mocked/courtsAlcobendas.json')


function randomSports(arr) {
  let n = Math.floor(Math.random() * sports.length)
  return ([...arr].sort(() => Math.random() - 0.5)).slice(0, n)
}

let DDBBPlayers = []
let DDBBClubs = []
let DDBBSports = []
let sportsIds = []



function createClubs() {
  const clubsPromises = []

  clubsData.forEach(club => {
    const newClub = new Club({
      name: club.name,
      email: club.email,
      photo: club.photo,
      address: club.address,
      city: club.city
    })

    clubsPromises.push(newClub.save())
  })

  return Promise.all(clubsPromises)
}

function createCourts(clubs, sports) {
  const courtsPromises = []
    courts.forEach(court => {
      const newCourt = new Court({
        club: clubs.find((club => club.name === court.club))._id,
        name: court.name,
        sports: court.sports.map(sportStr => sports.find(sport => sport.name === sportStr))._id,
        indoorOrOutdoor: court.indoorOrOutdoor
      })

      courtsPromises.push(newCourt.save())
    })

    return Promise.all(courtsPromises)
}

Promise.all([
  /*Sport.deleteMany(),
  Club.deleteMany(),
  Court.deleteMany(),
  User.deleteMany(),
  Request.deleteMany(),
  Match.deleteMany(),
  Message.deleteMany()*/
  ])
  .then(() => {
    return Sport.create(sports)
  })
  .then((createdSports) => {
    DDBBSports = createdSports
    sportsIds = createdSports.map(sport => sport._id)

    const createdPlayers = []
    for (let i = 0; i < 30; i++) {
      const player = new Player({
        name: faker.name.firstName(),
        surname: faker.name.lastName(),
        username: faker.internet.username,
        email: faker.internet.email(),
        password: 'sportmeet',
        photo: faker.image.people(),
        fairPlay: 0,
        userType: 'Player',
        sport: randomSports(sportsIds),
        validated: true,
        isAdmin: false
      })
      createdPlayers.push(player.save())
    }

    /* DDBBPlayers = Promise.all(createdPlayers) */
    return Promise.all(createdPlayers)
  })
  .then(players => {
    DDBBPlayers = players
    createClubs()
  })
  .then(createdClubs => {
    DDBBClubs = createdClubs
    return createCourts(DDBBClubs, DDBBSports)
  })
  .then(createdCourts => {

  })