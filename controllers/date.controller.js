//(year, month, day, hours, minutes) => create this Date in UTC+1 (Spain-WinterTime)
module.exports.createDate = (year, month, day, hours, minutes) => {
  const finalMonth = month - 1
  const finalHours = hours + 1
  return new Date(year, finalMonth, day, finalHours, minutes)
}

//To create a random Date from *3 years* ago until current date, with hours and minutes indicated, in UTC+1 (Spain-WinterTime)
module.exports.newPastDate = (hours, minutes) => {
  const millSec3Years = 94608000000  // (= 3*365*24*60*60*1000)
  const currentTime = Date.now()
  const randomPastTime = currentTime - (Math.floor(Math.random() * millSec3Years))
  const randomPastDate = new Date(randomPastTime)
  const randomPastYear = randomPastDate.getFullYear()
  const randomPastMonth = randomPastDate.getMonth()
  const randomPastDay = randomPastDate.getDate()
  const finalHours = hours + 1
  return new Date(randomPastYear, randomPastMonth, randomPastDay, finalHours, minutes)
}

//To create a random Date from current date until *1 month* later, with hours and minutes indicated, in UTC+1 (Spain-WinterTime)
module.exports.newFutureDate = (hours, minutes) => {
  const millSec1Month = 2592000000  // (= 30*24*60*60*1000)
  const currentTime = Date.now()
  const randomFutureTime = currentTime + (Math.floor(Math.random() * millSec1Month))
  const randomFutureDate = new Date(randomFutureTime)
  const randomFutureYear = randomFutureDate.getFullYear()
  const randomFutureMonth = randomFutureDate.getMonth()
  const randomFutureDay = randomFutureDate.getDate()
  const finalHours = hours + 1
  return new Date(randomFutureYear, randomFutureMonth, randomFutureDay, finalHours, minutes)
}