//we need express because of the Router() function
const express = require('express');

// The express.Router class can be used to create modular mountable route handlers. 
//A Router instance is a complete middleware and routing system; 
//for this reason it is often referred to as a “mini-app”.
const router = express.Router();

//homepage's controller
const controller = require('../controllers/base.controller')

//user's controller
const userController = require('../controllers/user.controller')

//GET petition to '/' => base function
router.get('/', controller.base)

//we export 'router' so it can be used into app.js file
module.exports = router;