//we need express because of the Router() function
const express = require('express');

// The express.Router class can be used to create modular mountable route handlers. 
//A Router instance is a complete middleware and routing system; 
//for this reason it is often referred to as a “mini-app”.
const router = express.Router();

//homepage's controller
const baseController = require('../controllers/base.controller')
//user's controller
const usersController = require('../controllers/users.controller')
//sportPlace's controller
const sportPlaceController = require('../controllers/sportField.controller')
//request's controller
const requestController = require('../controllers/request.controller')
//match's controller
const matchController = require('../controllers/match.controller')
//authMiddleware
const authMiddleware = require('../middlewares/auth.middleware')
//playMiddleware
const playMiddleware = require('../middlewares/play.middleware')

//GET petition to '/' => base function
router.get('/', baseController.base)

//GET petition to '/users/new' => user function
router.get('/players/new', authMiddleware.isNotAuthenticated, usersController.new)
//POST petition to '/users' => user function
router.post('/players', authMiddleware.isNotAuthenticated, usersController.create)
//GET petition to '/users/:token/validate' => user function
// router.get('/users/:token/validate', userController.validate)

//GET petition to '/login' => user function
// router.get('/login', authMiddleware.isNotAuthenticated, userController.login)
//POST petition to '/login' => user function
// router.post('/login', authMiddleware.isNotAuthenticated, userController.doLogin)
//GET petition to '/logout' => user function
// router.get('/logout', authMiddleware.isAuthenticated, userController.logout)

//GET petition to '/sportfield/new' => sportPlace function
// router.get('/sportfield/new', authMiddleware.isAuthenticated, authMiddleware.isClub, sportFieldController.new)
//POST petition to '/sportfield' => sportPlace function
// router.post('/sportfield', authMiddleware.isAuthenticated, authMiddleware.isClub, sportFieldController.create)

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