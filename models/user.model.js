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
    required: [true, 'Name is required'],
    trim: true
  },
  surname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    trim: true,
    minlength: [8, 'Password needs at last 8 chars']
  },
  userType: {
    type: String,
    required: [true, 'user\'s type is required'],
    enum: [
      'Club',
      'Player'
    ]
  },
  fairPlay: {
    type: Number,
    default: 0
  },
  sport: {
    type: String,
    enum: [
      'Padel',
      'Tennis', 
      'Futsal', 
      'Basketball', 
      'Volleyball'
    ],
    minlength: [1, 'Select at least one sport']

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
    type: Boolean,
    default: false
  }  
}, { timestamps: true })

userSchema.method.checkPassword = function(password) {
  const user = this
  return bcrypt.compare(password, user.password)
}

//create the user
const User = mongoose.model('User', userSchema)

//export the user
module.exports = User