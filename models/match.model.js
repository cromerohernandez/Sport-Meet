const mongoose = require('mongoose')
const Schema = mongoose.Schema

const message = require('../models/message.model')

const matchSchema = new Schema({
  sport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sport',
    required: [true, 'Sport is required']
  },
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
    required: [true, 'Club is required']
  },
  court: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Court',
    //required: [true, 'Court is required']
  },
  startDate: {
    type: Date,
    required: [true, 'StartTime is required']
  },
  endDate: {
    type: Date,
    required: [true, 'EndTime is required']
  },
  players: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Base',
      required: [true, 'User is required']
  }],
  /*confirmed: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Base',
        required: [true, 'User is required']
      },
      confirmedUser: {
        type: Boolean,
        default: false
      }
    }
  ],*/
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