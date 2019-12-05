const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sportPlaceSchema = new Schema({
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
    type: String,
    required: [true, 'Opening time is required'],
    enum: [
      '00:00',
      '01:00',
      '02:00',
      '03:00',
      '04:00',
      '05:00',
      '06:00',
      '07:00',
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00',
      '23:00'
    ]
  },
  closingTime: {
    type: String,
    required: [true, 'Closing time is required'],
    enum: [
      '00:00',
      '01:00',
      '02:00',
      '03:00',
      '04:00',
      '05:00',
      '06:00',
      '07:00',
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00',
      '23:00'
    ]
  }
})

//create the sportPlace model
const SportPlace = mongoose.model('SportPlace', sportPlaceSchema)

//Export spportPlace model
module.exports = SportPlace