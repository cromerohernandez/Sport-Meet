const mongoose = require('mongoose')
const Schema = mongoose.Schema

const requestSchema = new Schema({
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: [true, 'Player is required']
  },
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
    required: [true, 'Court is required']
  },
  startTime: {
    type: Date,
    required: [true, 'StartTime is required']
  },
  endTime: {
    type: Date,
    required: [true, 'EndTime is required']
  },
  active: {
    type: Boolean,
    default: true
  }
}, { timestamps: true })

//create the request model
const Request = mongoose.model('Request', requestSchema);

//Export request model
module.exports = Request