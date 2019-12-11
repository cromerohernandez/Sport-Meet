const mongoose = require('mongoose')
const Schema = mongoose.Schema

require('../../config/db.config')
const Base = require('./base.model')
const randToken = require('rand-token')

//Player schema
const playerSchema = new Schema({
  surname: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  fairPlay: {
    type: Number,
    default: 0
  },
  sport: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sport',
      required: [true, 'fill all the field'],
      level: {
        type: Number,
        min: 1,
        max: 5,
        default: 1
      }
    }
  ],
  activationToken: {
    type: String,
    default: () => randToken.generate(64)
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
})

//Player schema extended by base schema
const Player = Base.discriminator(
  'Player', 
  playerSchema
)

module.exports = Player