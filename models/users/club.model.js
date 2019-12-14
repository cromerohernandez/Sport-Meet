const mongoose = require('mongoose')
const Schema = mongoose.Schema

require('../../config/db.config')
const Base = require('./base.model')

const Club = Base.discriminator(
  'Club', 
  new Schema({
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    openingTime: {
      type: Number,
      required: [true, 'Opening time is required'],
      min: 0,
      max: 23
    },
    closingTime: {
      type: Number,
      required: [true, 'Opening time is required'],
      min: 0,
      max: 23
    }
  })
)

module.exports = Club