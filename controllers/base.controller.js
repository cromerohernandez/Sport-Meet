//to handle errors
const createError = require('http-errors');

// render the home page
module.exports.base = (req, res, next) => {
  res.render('index')
}