const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const sportFieldSchema = new Schema({
  name: {
    type: String,
    required: [True, 'Name is required']
  },
  sportPlace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SportPlace',
    required: [True, 'Sportplace is required']
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

//create the sportfield model
const SportField = mongoose.model('SportField', sportFieldSchema)

//export the sportfield model
module.exports = SportField