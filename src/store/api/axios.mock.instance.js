import axios from 'axios'
const saAxios = axios.create({})
saAxios.interceptors.response.use(
  response => {
    // unwrap
    return response.data
  },
  error => {
    return Promise.reject(error.response.data)
  }
)
export default saAxios
