import axios from 'axios'

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:9600'

const api = axios.create({
  baseURL,
})

export default api
