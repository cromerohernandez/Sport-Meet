const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10


require('../../config/db.config')

//discriminatorKey
const options = {
  discriminatorKey: '__type',
  collection: 'users'
}

//Base model: these are the common fileds between Player.model and Club.model
const Base = mongoose.model('Base', new Schema({
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
    minlength: [8, 'Password needs at last 8 chars']
  },
  photo: {
    type: String,
    default: '../../public/images/defaultUser.png'
  },
  validated: {
    type: Boolean,
    default: false
  },
}, options))

//middleware: if the password has been modified, then hash it again
Base.pre('save', function (next) {
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
Base.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password)
}

module.exports = Base