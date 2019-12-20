function removeSport (username, sportId, element) {
  const req = axios.post(`/players/${username}/sports/delete/${sportId}`)
  req
    .then(res => {
      element.parentElement.remove()
    })
    .catch(err => {
      console.log(err)
    })
}

function removeCourt (name, courtId, element) {
  const req = axios.post(`/clubs/${name}/courts/delete/${courtId}`)
  req
    .then(() => {
      element.parentElement.remove()
    })
    .catch(err => {
      console.log(err)
    })
}