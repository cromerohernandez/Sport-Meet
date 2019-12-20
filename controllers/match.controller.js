/* TODO:
    - index
    - addComment
*/

// module.exports.index = (req, res, next) => {
//   Request.find({
//       active: true,
//       sport: sportRequest._id,
//       club: clubRequest._id,
//       startDate: startDateRequest,
//       endDate: endDateRequest
//       //level
//   }) 
//   .limit(sportRequest.numberOfPlayers)
//   .then(requestToMatch => {
//       if (requestToMatch.length === sportRequest.numberOfPlayers) {
//       console.log(requestToMatch)
//       requestToMatch.map(request => {
//           console.log(request)
//           Request.findByIdAndUpdate(
//           request._id,
//           { 
//               active: false 
//           },
//           { new: true }
//           )
//           .then((falsedRequests) => {
          
//           console.log(falsedRequests)
//           })
//       })
//       } else {
//       req.session.genericError = "The request has been created. When we found a match we will send you an email."
//       res.redirect(`/players/${user.username}`)
//       }
//   })
// }
