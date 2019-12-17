const Model = require('../models/users/player.model')

class Player {
  constructor(id){
    this.id = id
  }

  static add (data) {
    const player = new Model(data)
    return player.save()
  }

  get() {
    const user = Model.findById({_id: this.id})
    return user
  }

  addSport (sport) {
    return Model.findByIdAndUpdate(
      this.id,
      {
        $push: { sports: sport }
      },
      {new: true}
    )
    .populate('sports')
  }

  findOne(query) {
    return Model.findOne(query)
  }
}

module.exports = Player