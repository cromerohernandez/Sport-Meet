const mongoose = require('mongoose')
const Schema = mongoose.Schema

require('../../config/db.config')
const Base = require('./base.model')

const Club = Base.discriminator(
  'Club', 
  new Schema({})
)

module.exports = Club