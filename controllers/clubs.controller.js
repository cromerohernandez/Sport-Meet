const Club = require('../models/users/club.model')
const Sport = require('../models/sport.model')
const mongoose = require('mongoose');

const mailer = require('../config/mailer.config');


module.exports.new = (_, res) => {
  res.render('users/form', { user: new Club })
}