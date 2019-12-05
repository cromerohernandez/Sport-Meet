const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sportSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  numberOfPlayers: {
    type: Number,
    required: true
  }
})

//create the sport model
const Sport = mongoose.model('Sport', sportSchema)

//Export sport model
module.exports = Sport