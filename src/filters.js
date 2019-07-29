import Vue from 'vue'
import moment from 'moment'

export function dateFilter (value, format = 'L') {
  if (value) {
    if (isNaN(Date.parse(value))) { // in DD.MM.YYYY
      value = moment(value, 'DD.MM.YYYY', true)
      return value.format(format)
    }
    // in YYYY-DD-MM
    return moment(value).format(format)
  }
}
Vue.filter('date', dateFilter)

export function dateTimeFilter (value, format = 'DD.MM.YYYY HH:mm:ss') {
  if (value) {
    if (isNaN(Date.parse(value))) { // in DD.MM.YYYY
      value = moment(value, 'DD.MM.YYYY HH:mm:ss', true)
      return value.format(format)
    }
    // in YYYY-DD-MM
    return moment(value).format(format)
  }
}

Vue.filter('datetime', dateTimeFilter)
