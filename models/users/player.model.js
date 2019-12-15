const mongoose = require('mongoose')
const Schema = mongoose.Schema

require('../../config/db.config')
const Base = require('./base.model')
const randToken = require('rand-token')
const uniqueValidator = require('mongoose-unique-validator')

//Player schema
const playerSchema = new Schema({
  surname: {
    type: String,
    required: [true, 'Surname is required'],
    trim: true
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    minlength: [6, 'Username needs at least 6 chars'],
    trim: true,
    unique: true
  },
  fairPlay: {
    type: Number,
    default: 0
  },
  sports: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sport',
      default: '',
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

playerSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.'})

//Player schema extended by base schema
const Player = Base.discriminator(
  'Player', 
  playerSchema
)

module.exports = Player