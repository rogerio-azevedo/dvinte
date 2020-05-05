import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4800',
  // baseURL: 'https://api.dvinte.com.br',
  // baseURL: 'https://cors-anywhere.herokuapp.com/http://198.211.112.112',
})

export default api
