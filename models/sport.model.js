const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sportSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  numberOfPlayers: {
    type: Number,
    required: [true, 'Number of players is required']
  }
})

//create the sport model
const Sport = mongoose.model('Sport', sportSchema)

//Export sport model
module.exports = Sport