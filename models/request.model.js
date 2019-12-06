const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const requestSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Player is required']
  },
  sportId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sport',
    required: [true, 'Sport is required']
  },
  sportPlaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SportPlace',
    required: [true, 'SportPlace is required']
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
  }
}, { timestamps: true })

//create the request model
const Request = mongoose.model('Request', requestSchema);

//Export request model
module.exports = Request