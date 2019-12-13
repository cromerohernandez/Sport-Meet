const mongoose = require('mongoose')
const Schema = mongoose.Schema

const message = require('message.model')

const matchSchema = new Schema({
  reference: {
    type: Number,
    required: [true, 'Reference is required']
  },
  sport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sport',
    required: [true, 'Sport is required']
  },
  startTime: {
    type: Date,
    required: [true, 'StartTime is required']
  },
  endTime: {
    type: Date,
    required: [true, 'EndTime is required']
  },
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
    required: [true, 'Club is required']
  },
  court: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Court',
    required: [true, 'Court is required']
  },
  confirmed: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
      },
      confirmedUser: {
        type: Boolean,
        default: false
      }
    }
  ],
  active: {
    type: Boolean,
    default: false
  },
  played:{
    type: Boolean,
    default: false
  },
  messages: [
    /*¿?*/
  ],
}, { timestamps: true })

//create the match model
const Match = mongoose.model('Match', matchSchema)

//export the match model
module.exports = Match