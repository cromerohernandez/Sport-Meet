const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clubSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  direction: {
    type: String,
    required: [true, 'Direction is required'],
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

//create the club model
const Club = mongoose.model('Club', clubSchema)

//Export club model
module.exports = Club