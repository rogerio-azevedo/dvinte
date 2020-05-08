import express from 'express'
import cors from 'cors'
import path from 'path'
import socketio from 'socket.io'
import routes from './routes'

import './database'

class App {
  constructor() {
    this.server = express()

    const io = socketio(this.server.http)

    this.server.use((req, res, next) => {
      req.io = io

      return next()
    })

    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.server.use(cors())
    this.server.use(express.json())
    this.server.use(
      '/portraits',
      express.static(
        path.resolve(__dirname, '..', 'tmp', 'uploads', 'portraits')
      )
    )
  }

  routes() {
    this.server.use(routes)
  }
}

export default new App().server
