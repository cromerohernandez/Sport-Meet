const mongoose = require('mongoose')
const Schema = mongoose.Schema

const requestSchema = new Schema({
  reference: {
    type: Number,
    required: [true, 'Reference is required']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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