require('../config/db.config')

//to generate meaningful random data
const faker = require('faker')

//models
const Sport = require('../models/sport.model')
const Player = require('../models/users/player.model')
const Club = require('../models/users/club.model')
const Court = require('../models/court.model')
const Request = require('../models/request.model')
const Match = require('../models/match.model')

//data
const sportsData = require('../data/sports.json')
const clubsData = require('../data/mocked/clubsAlcobendas.json')
const courtsData = require('../data/mocked/courtsAlcobendas.json')

//Function to create a random userName with at least 6 characters
function randomValidUserName(username) {
  while (username.length < 6) {
    username = faker.internet.userName()
  }
  return username
}

//Function to select a random number of random sports (use to create Players)
function randomSports(arr) {
  const n = Math.floor(Math.random() * sportsData.length)
  return ([...arr].sort(() => Math.random() - 0.5)).slice(0, n)
}

//Arrays that receive created data to use to create the next data
let DDBBSports = []
let sportsIds = []
let DDBBPlayers = []
let DDBBClubs = []
let DDBBCourts = []

//Function to create Players
function createPlayers(sports) {
  const createdPlayers = []

  for (let i = 0; i < 40; i++) {
    const newplayer = new Player({
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      username: randomValidUserName(faker.internet.userName()),
      email: faker.internet.email(),
      password: 'sportmeet',
      photo: faker.image.people(),
      fairPlay: 0,
      userType: 'Player',
      sport: randomSports(sports),
      validated: true,
      isAdmin: false
    })

    createdPlayers.push(newplayer.save())
  }
  
  return Promise.all(createdPlayers)
}

//Function to create Clubs
function createClubs() {
  const createdClubs = []

  clubsData.forEach(club => {
    const newClub = new Club({
      name: club.name,
      email: club.email,
      password: 'sportmeet',
      photo: club.photo,
      validated: true,
      address: club.address,
      city: club.city,
      openingTime: club.openingTime,
      closingTime: club.closingTime
    })

    createdClubs.push(newClub.save())
  })

  return Promise.all(createdClubs)
}

//Function to create Courts
function createCourts(clubs, sports) {
  const createdCourts = []

  courtsData.forEach(court => {
    const newCourt = new Court({
      club: clubs.find(club => club.name === court.club)._id,
      name: court.name,
      sports: court.sports.map(sportStr => sports.find(sport => sport.name === sportStr)._id),
      indoorOrOutdoor: court.indoorOrOutdoor
    })

    createdCourts.push(newCourt.save())
  })

    return Promise.all(createdCourts)
}

//Function to create Request
//function createClubs() {}

//Function to create Match
//function createClubs() {}

//To delete old data and create new data
Promise.all([
  Sport.deleteMany(),
  Player.deleteMany(),
  Club.deleteMany(),
  Court.deleteMany(),
  /*Request.deleteMany(),
  Match.deleteMany(),
  Message.deleteMany()*/
  ])
  .then(() => {
    return Sport.create(sportsData)
  })
  .then(createdSports => {
    DDBBSports = createdSports
    console.log(`${DDBBSports.length} sports created`)
    sportsIds = createdSports.map(sport => sport._id)
    return createPlayers(sportsIds)
  })
  .then(createdPlayers => {
    DDBBPlayers = createdPlayers
    console.log(`${DDBBPlayers.length} players created`)
    return createClubs()
  })
  .then(createdClubs => {
    DDBBClubs = createdClubs
    console.log(`${DDBBClubs.length} clubs created`)
    return createCourts(DDBBClubs, DDBBSports)
  })
  .then(createdCourts => {
      DDBBCourts = createdCourts
      console.log(`${DDBBCourts.length} courts created`)

  })
  .catch(console.error)