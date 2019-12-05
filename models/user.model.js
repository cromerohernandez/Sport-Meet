//in this model is only missing a functionality: to re-hash the password when the user modify it
//I'll deploy it at the appropriate time

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// token generator
const randToken = require('rand-token')

//to hash user's password
const bcrypt = require('bcrypt')

require('../config/db.config')

// create the schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  surname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate: [
      function(input) {
        return input.length >= 8;
      },
      "Password should be at least 8 character."
    ]
  },
  fairPlay: {
    type: Number,
    default: 0
  },
  sport: {
    type: String,
    enum: ['Padel', 'Tennis', 'Futsal', 'Basketball', 'Volleyball'],
    required: [
      function() {
        return this.enum.length > 1;
      },
      'select at least a sport'
    ]
  },
  level: {
    type: Number,
    default: 0,
    min: 1,
    max: 5
  },
  activationToken: {
    type: String,
    default: () => randToken.generate(64)
  },
  validated: {
    default: false
  },  
})

userSchema.method.checkPassword = function(password) {
  const user = this
  return bcrypt.compare(password, user.password)
}

//create the user
const User = mongoose.model('User', userSchema)

//export the user
module.exports = User