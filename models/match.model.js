const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  startTime: {
    type: Number,
    required: [true, 'StartTime is required']
  },
  endTime: {
    type: Number,
    required: [true, 'EndTime is required']
  },
  sportPlace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SportPlace',
    required: [true, 'SportPlace is required']
  },
  sportField: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SportField',
    required: [true, 'SportField is required']
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
    { 
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
      },
      text: {
        type: String,
        required: [true, 'Text is required']
      }
    }, { timestamps: true }
  ],
}, { timestamps: true })

//create the match model
const Match = mongoose.model('Match', matchSchema)

//export the match model
module.exports = Match