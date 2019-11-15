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
  // reset () {
  //   return axios
  //     .post(`${url}?token=${token}`, {'reset': true})
  //     .then(val => {
  //       return val.data
  //     })
  //     .catch()
  // }
}
