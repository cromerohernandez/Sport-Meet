const mongoose = require('mongoose')
const Schema = mongoose.Schema

// token generator
const randToken = require('rand-token')

require('../config/db.config')

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
  activationToken: {
    type: String,
    default: () => randToken.generate(64)
  },
  validated: {
    default: false
  },  
})