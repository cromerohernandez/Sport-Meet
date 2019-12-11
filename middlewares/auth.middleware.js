/* TODO:
  - isAuthenticated (session exists) √
  - isNotAuthenticated (session not exits) √
  - isPlayer (user is a Player)
  - isClub (user is a Club)
*/

module.exports.isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next()
  } else {
    req.session.genericError = 'User is not authenticated!'
    res.redirect('/login')
  }
}

module.exports.isNotAuthenticated = (req, res, next) => {
  if (req.session.user) {
    res.redirect('/:username/:id');
  } else {
    next()
  }
}
