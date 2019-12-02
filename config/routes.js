const express = require('express');
const router = express.Router();
const controller = require('../controllers/base.controller')

module.exports = router;

router.get('/', controller.base)