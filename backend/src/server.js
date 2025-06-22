import http from 'http'

import { setupWebsocket } from './websocket'

import app from './app'

const server = http.Server(app)
setupWebsocket(server)

require('dotenv/config')

const port = process.env.PORT || 9600

server.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`)
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)
})
