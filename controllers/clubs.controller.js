const Club = require('../models/users/club.model')
const mongoose = require('mongoose');

const mailer = require('../config/mailer.config');


module.exports.new = (_, res) => {
  res.render('clubs/form', { 
    user: new Club,
    type: 'Club'
  })
}

module.exports.create = (req, res, next) => {
  const user = new Club({
    name: req.body.name,
    address: req.body.address,
    email: req.body.email,
    password: req.body.password,
    photo: req.file ? req.file.url : undefined
  })

  user.save()
    .then(user => {
      mailer.sendValidateEmailForClub(user)
      mailer.sendClubReviewToSportmeet(user)
      res.redirect('/login')
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        // console.log(error.errors)
        res.render('clubs/form', { 
          user, 
          error: error.errors 
        })
      } else {
        next(error);
      }
    })
}