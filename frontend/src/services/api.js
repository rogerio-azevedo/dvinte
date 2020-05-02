import axios from 'axios'

const api = axios.create({
  // baseURL: 'http://localhost:4800',
  baseURL: '',
  // baseURL: 'https://cors-anywhere.herokuapp.com/http://167.71.255.4',
})

export default api
