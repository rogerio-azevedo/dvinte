import http from 'http'

import { setupWebsocket } from './websocket'

import app from './app'

const server = http.Server(app)
setupWebsocket(server)

require('dotenv/config')

server.listen(process.env.SERVER_PORT)
