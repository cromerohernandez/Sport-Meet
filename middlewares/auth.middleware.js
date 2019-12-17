//check if current user is authenticated (session exists)
module.exports.isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next()
  } else {
    req.session.genericError = 'User is not authenticated!'
    res.redirect('/login')
  }
}

//check if current user is not authenticated (session doesn´t exist)
module.exports.isNotAuthenticated = (req, res, next) => {
  if (req.session.user) {
    res.redirect('/');
  } else {
    next()
  }
}
