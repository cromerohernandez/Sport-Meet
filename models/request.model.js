const mongoose = require('mongoose')
const Schema = mongoose.Schema

const requestSchema = new Schema({
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: [true, 'Player name is wrong!']
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
  startDate: {
    type: Date,
    required: [true, 'StartDate is required']
  },
  endDate: {
    type: Date,
    required: [true, 'EndDate is required']
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