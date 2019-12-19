//we need express because of the Router() function
const express = require('express');

// The express.Router class can be used to create modular mountable route handlers. 
//A Router instance is a complete middleware and routing system; 
//for this reason it is often referred to as a “mini-app”.
const router = express.Router();

//homepage's controller
const baseController = require('../controllers/base.controller')
//player's controller
const playersController = require('../controllers/players.controller')
//club's controller
const clubsController = require('../controllers/clubs.controller')
//court's controller
const courtsController = require('../controllers/courts.controller')
//request's controller
const requestController = require('../controllers/request.controller')
//match's controller
const matchController = require('../controllers/match.controller')
//authMiddleware
const authMiddleware = require('../middlewares/auth.middleware')
//playMiddleware
const playMiddleware = require('../middlewares/play.middleware')

//base
router.get('/', authMiddleware.isAuthenticated, baseController.index)
router.get('/login', authMiddleware.isNotAuthenticated, baseController.login)
router.post('/login', authMiddleware.isNotAuthenticated, baseController.doLogin)
router.post('/logout', authMiddleware.isAuthenticated, baseController.logout)

//players
router.get('/players/new', authMiddleware.isNotAuthenticated, playersController.new)
router.post('/players', authMiddleware.isNotAuthenticated, playersController.create)
router.get('/players/:token/validate', playersController.validate)
router.get(`/players/:username`, authMiddleware.isAuthenticated, playersController.profile)
router.get('/players/:username/sports/new', authMiddleware.isAuthenticated, authMiddleware.isPlayer, playersController.newSport)
router.post('/players/:username/sports/new', authMiddleware.isAuthenticated, authMiddleware.isPlayer, playersController.addNewSport)

//request
router.get('/players/:username/request/new', authMiddleware.isAuthenticated, authMiddleware.isPlayer, requestController.selectSport)
router.post('/players/:username/request/new', authMiddleware.isAuthenticated, authMiddleware.isPlayer, requestController.new)
router.post('/players/:username/request/new/:sport', authMiddleware.isAuthenticated, authMiddleware.isPlayer, requestController.addNewRequest)

//clubs
router.get('/clubs/new', authMiddleware.isNotAuthenticated, clubsController.new)
router.post('/clubs', authMiddleware.isNotAuthenticated, clubsController.create)
router.get('/clubs/:token/validate', clubsController.validate)
router.get(`/clubs/:name`, authMiddleware.isAuthenticated, clubsController.profile)

//courts
router.get('/clubs/:name/courts/new', authMiddleware.isAuthenticated, authMiddleware.isClub, courtsController.new)
router.post('/clubs/:name/courts/add', authMiddleware.isAuthenticated, authMiddleware.isClub, courtsController.add)

//GET petition to '/match/:id' => match function
// router.get('/match/:id', authMiddleware.isAuthenticated, matchController.index)
//POST petition to '/match/:id/comments' => match function
// router.post('/match/:id/comments', authMiddleware.isAuthenticated, playMiddleware.isActiveAndNotPlayed, matchController.addComment)

//we export 'router' so it can be used into app.js file
module.exports = router;