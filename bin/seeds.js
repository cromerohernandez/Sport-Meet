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
function randomSports(arrSports) {
  const n = Math.floor(Math.random() * arrSports.length)
  return ([...arrSports].sort(() => Math.random() - 0.5)).slice(0, n)
}

//Function to select a random player
function randomPlayer(arrPlayers) {
  const n = Math.floor(Math.random() * arrPlayers.length)
  return arrPlayers[n]
}

//Function to select a random court for a player
function randomCourt(arrCourts, player) {
  const selectedSport = player.sports[Math.floor(Math.random() * player.sports.length)]
  let n = Math.floor(Math.random() * arrCourts.length)
  
  while (arrCourts[n].sports !== selectedSport) {
    n = Math.floor(Math.random() * arrCourts.length)
  }

  for (let i = 0; i < arrCourts[n].sports.length; i++) {
    
    if (arrCourts[n].sports[i] === selectedSport) {
      return arrCourts[n]
    }

  }


  return arrCourts[n]

}

//Arrays that receive created data to use to create the next data
let DDBBSports = []
let sportsIds = []
let DDBBPlayers = []
let DDBBClubs = []
let DDBBCourts = []
let DDBBRequests = []
let DDBBMatches = []

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

//Function to create Requests
function createRequests(courts, players) {
  //To create past requests
  for(let i = 0; i < 10; i++) {
    const selectedPlayer = randomPlayer(DDBBPlayers)
    const selectedCourt = randomCourt(DDBBCourts, selectedPlayer)
    const newPastRequest = new Request({
      player: selectedPlayer_id,
      sport: selectedCourt.sport,
      club: selectedCourt.club,
      court: selectedCourt._id,
      startTime: ,//date
      endTime: ,//date
      active: false
    })
    newPastRequest.save()
  }

}

//Function to create Matches
//function createMatches() {}

//Function to create Messages
//function createMessages() {}

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
    createRequests()
    console.log(`${DDBBRequests.length} requests created`)
  })
  /*.catch(error => console.log(error))
    .then(() => {
      createMatches()
      console.log(`${DDBBMatches.length} requests created`)
    })
    .catch(error => console.log(error))*/