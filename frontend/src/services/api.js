import axios from 'axios'

const api = axios.create({
  // baseURL: 'http://localhost:4800',
  // baseURL: '167.71.255.4',
  baseURL: 'https://cors-anywhere.herokuapp.com/http://198.211.112.112',
})

export default api
