import axios from 'axios'

export default {
  get (url, params = {}) {
    let token = JSON.parse(localStorage.getItem('user')).token

    return axios
      .post(`${url}?token=${token}`, Object.assign(params, {}))
      .then(val => {
        return val.data
      })
      .catch(error => {
        throw new Error(`ApiService ${error}`)
      })
  },
  download (url, reset = 0) {
    let token = JSON.parse(localStorage.getItem('user')).token

    return window.open(
      `${
        process.env.VUE_APP_APIBASE_APP
      }${url}?token=${token}&download=1&reset=${reset | 0}`,
      '_self',
      ''
    )
  }
}
