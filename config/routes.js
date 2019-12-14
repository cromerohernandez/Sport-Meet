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

router.get('/', authMiddleware.isAuthenticated, baseController.index)
//GET petition to 'login' => base function
router.get('/login', authMiddleware.isNotAuthenticated, baseController.login)
//POST do login
router.post('/login', authMiddleware.isNotAuthenticated, baseController.doLogin)
//POST petition to '/logout' => user function
router.post('/logout', authMiddleware.isAuthenticated, baseController.logout)

//GET petition to '/users/new' => user function
router.get('/players/new', authMiddleware.isNotAuthenticated, playersController.new)
//POST petition to '/users' => user function
router.post('/players', authMiddleware.isNotAuthenticated, playersController.create)
//GET petition to '/users/:token/validate' => user function
router.get('/players/:token/validate', playersController.validate)
//GET petition to '/login' => user function
// router.get('/login', authMiddleware.isNotAuthenticated, playersController.login)
// //POST petition to '/login' => user function
// router.post('/login', authMiddleware.isNotAuthenticated, playersController.doLogin)


//GET petition to '/users/new' => user function
router.get('/clubs/new', authMiddleware.isNotAuthenticated, clubsController.new)
//POST petition to '/users/new' => user function
router.post('/clubs', authMiddleware.isNotAuthenticated, clubsController.create)


//GET petition to '/courts/new' => court function
// router.get('/courts/new', authMiddleware.isAuthenticated, authMiddleware.isClub, courtsController.new)
//POST petition to '/courts' => court function
// router.post('/courts', authMiddleware.isAuthenticated, authMiddleware.isClub, courtsController.create)

//GET petition to '/request/new' => request function
// router.get('/request/new', authMiddleware.isAuthenticated, authMiddleware.isPlayer, requestController.new)
//POST petition to '/request' => request function
// router.post('/request', authMiddleware.isAuthenticated, authMiddleware.isPlayer, requestController.create)

//GET petition to '/match/:id' => match function
// router.get('/match/:id', authMiddleware.isAuthenticated, matchController.index)
//POST petition to '/match/:id/comments' => match function
// router.post('/match/:id/comments', authMiddleware.isAuthenticated, playMiddleware.isActiveAndNotPlayed, matchController.addComment)



//GET petition to '/:id' => user function
// router.get('/:username/:id', authMiddleware.isAuthenticated, userController.profile)

//we export 'router' so it can be used into app.js file
module.exports = router;