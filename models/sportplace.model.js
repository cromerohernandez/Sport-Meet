const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sportPlaceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  direction: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  openingTime: {
    type: Number,
    required: true,
    min: 0,
    max: 23
  },
  closingTime: {
    type: Number,
    required: true,
    min: 0,
    max: 23
  }
})

//create the sportPlace model
const SportPlace = mongoose.model('SportPlace', sportPlaceSchema)

//Export spportPlace model
module.exports = SportPlace