const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const randToken = require('rand-token')
const SALT_WORK_FACTOR = 10
const uniqueValidator = require('mongoose-unique-validator')

require('../../config/db.config')

//discriminatorKey
const options = {
  discriminatorKey: '__type',
  collection: 'users',
  timestamps: true,
  toJSON: {virtuals: true}
}

const baseSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
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
    minlength: [8, 'Password needs at least 8 chars']
  },
  imgName: {
    type: String
  },
  photo: {
    type: String,
    default: '../../images/defaultUser.png'
  },
  activationToken: {
    type: String,
    default: () => randToken.generate(64)
  },
  validated: {
    type: Boolean,
    default: false
  },
}, options)

baseSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' })

//Base model: these are the common fileds between Player.model and Club.model
const Base = mongoose.model('Base', baseSchema)

//middleware: if the password has been modified, then hash it again
baseSchema.pre('save', function (next) {
  const user = this

  if (user.isModified('password')) {
    bcrypt.genSalt(SALT_WORK_FACTOR)
      .then(salt => {
        return bcrypt.hash(user.password, salt)
          .then(hash => {
            user.password = hash
            next()
          });
      })
      .catch(error => next(error))
  } else {
    next()
  }
})

//check if the hashed passwords are equals
baseSchema.methods.checkPassword = function(password) {
  return bcrypt.compare(password, this.password)
}

baseSchema.methods.parseHourToNumber = function(hour) {
  return Number(hour.slice(0,2))
}

module.exports = Base