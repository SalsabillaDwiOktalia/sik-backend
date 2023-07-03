const moment = require('moment')
const addOneDay = (date) => {
  return moment(date, 'YYYY/MM/DD').add(1, 'days').toDate()
}
module.exports = {
  addOneDay
}