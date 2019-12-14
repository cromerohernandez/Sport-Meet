const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  match: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match',
    required: [true, 'Match is required']
  },
  text: {
    type: String,
    required: [true, 'Text is required']
  }
}, { timestamps: true })

//create the message model
const Message = mongoose.model('Message', messageSchema)

//export the message model
module.exports = Message