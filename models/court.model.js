const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courtSchema = new Schema({
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
    required: [true, 'Club is required']
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true
  },
  sports: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Sport',
    required: [true, 'Sport is required']    
  },
  indoorOrOutdoor: {
    type: String,
    enum: [
      'indoor',
      'outdoor'
    ],
    required: [true, 'Indoor/Outdoor is required']
  },
})

//create the court model
const Court = mongoose.model('Court', courtSchema)

//export the court model
module.exports = Court