//seeds´s const
const PLAYERS = 2 //=> number of random players to create
const PASTREQUESTS = 20 //=> number of random past requests to create
const ACTIVEREQUESTS = 15 //=> number of random active requests to create
const PASTMACHES = 30 //=> number of random past matches to create
const ACTIVEMACHES = 25 //=> number of random active matches to create
const MAXDURATIONREQUEST = 5 //=> maximum number of hours of a request
const MAXDURATIONMATCH = 3 //=> maximum number of hours of a match

//controller to manage dates
const dateController = require('../controllers/date.controller')

//db config
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

//Function to select a random number of a random sports
function randomSports(arrSportsId) { 
  let n = Math.floor(Math.random() * arrSportsId.length) 
  return ([...arrSportsId].sort(() => Math.random() - 0.5)).slice(0, n + 1) 
}

//Function to select a random item from an array
function randomItemArray(arr) {
  const n = Math.floor(Math.random() * arr.length)
  return arr[n]
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////
//Function to select a random player/court for a sport
function randomItemForSport(DDBBarr, sportId) {
  const randomOrderArr = ([...DDBBarr].sort(() => Math.random() - 0.5))
  let randomItem = {}
  for (let i = 0; i < randomOrderArr.length; i++) {
    randomOrderArr[i].sports.forEach(function(itemSport) {
      if (itemSport === sportId) {
        randomItem = randomOrderArr[i] 
        return
      }
    })
    return
  }
  return randomItem
}

//Function to select a random player/court for a sport
function randomItemForSport(DDBBarr, sportId) {
  const randomOrderArr = ([...DDBBarr].sort(() => Math.random() - 0.5))
  //let randomItem = {}
  for (let i = 0; i < randomOrderArr.length; i++) {
    //randomItem = randomOrderArr[i]
    if (randomOrderArr[i].sports.find(sport => sport === sportId)) {
      return randomOrderArr[i]
    }
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//Arrays that receive created data to use to create the next data
let DDBBSports = []
let sportsIds = []
let DDBBPlayers = []
let DDBBClubs = []
let DDBBCourts = []
let DDBBRequests = []
let DDBBMatches = []

//Function to create Players
function createPlayers(sportsIds) {
  const createdPlayers = []

  for (let i = 0; i < PLAYERS; i++) {
    const newplayer = new Player({
      name: faker.name.firstName(),
      surname: faker.name.lastName(),
      username: randomValidUserName(faker.internet.userName()),
      email: faker.internet.email(),
      password: 'sportmeet',
      photo: faker.image.people(),
      fairPlay: 0,
      userType: 'Player',
      sports: randomSports(sportsIds),
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
function createCourts(sportsArr, clubsArr) {
  const createdCourts = []

  courtsData.forEach(court => {
    const newCourt = new Court({
      club: clubsArr.find(club => club.name === court.club)._id,
      name: court.name,
      sports: court.sports.map(sportStr => sportsArr.find(sport => sport.name === sportStr)._id),
      indoorOrOutdoor: court.indoorOrOutdoor
    })

    createdCourts.push(newCourt.save())
  })

  return Promise.all(createdCourts)
}

//Function to create Requests
function createRequests(playersArr, clubsArr, courtsArr) {
  const createdPastRequests = []
  const createdFutureRequests = []

  //To create past requests
  for(let i = 0; i < PASTREQUESTS; i++) {
    const randomPlayer = randomItemArray(playersArr)
    const selectedSportId = randomItemArray(randomPlayer.sports)
    const selectedCourt = randomItemForSport(courtsArr, selectedSportId)
    console.log(selectedCourt) //////////////////////////////////////////////////////////////////////////
    const selectedClub = clubsArr.find(club => club._id === selectedCourt.club)
    console.log(selectedClub) //////////////////////////////////////////////////////////////////////////
    const randomDuration = Math.floor((Math.random() * MAXDURATIONREQUEST) + 1)
    console.log(randomDuration) //////////////////////////////////////////////////////////////////////////
    const selectedStartTime = Math.floor((Math.random * ((selectedClub.closingTime - randomDuration) - selectedClub.openingTime)) + selectedClub.openingTime)
    const randomDate = dateController.newPastDate(selectedStartTime, 0)

    const newPastRequest = new Request({
      player: randomPlayer._id,
      sport: selectedSportId,
      club: selectedCourt.club,
      court: selectedCourt._id,
      startDate: randomDate,
      endDate: randomDate.setHours(randomDate.getHours() + randomDuration),
      active: false
    })

    createdPastRequests.push(newPastRequest.save())
  }

  return Promise.all(createdPastRequests)
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
    return createCourts(DDBBSports, DDBBClubs)
  })
  .then(createdCourts => {
    DDBBCourts = createdCourts
    console.log(`${DDBBCourts.length} courts created`)
    // createRequests(DDBBPlayers, DDBBClubs, DDBBCourts)
    // DDBBRequests = createdPastRequests
    //console.log(`${DDBBRequests.length} requests created`)
  })
  .catch(error => console.log(error))
/*    .then(() => {
      createMatches()
      console.log(`${DDBBMatches.length} requests created`)
    })
    .catch(error => console.log(error))*/