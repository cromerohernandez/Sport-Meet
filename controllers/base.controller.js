//to handle errors
const createError = require('http-errors');

module.exports.base = (req, res, next) => {
  res.render('index')
}