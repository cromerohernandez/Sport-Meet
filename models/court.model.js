const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courtSchema = new Schema({
  name: {
    type: String,
    required: [True, 'Name is required']
  },
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
    required: [True, 'Club is required']
  },
  sport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sport',
    required: [True, 'Sport is required']    
  },
  indoorOrOutdoor: {
    enum: [
      'indoor',
      'outdoor'
    ],
    required: [True, 'Indoor/Outdoor is required']
  },
})

//create the court model
const Court = mongoose.model('Court', courtSchema)

//export the court model
module.exports = Court