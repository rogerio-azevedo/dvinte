import express from 'express'
import cors from 'cors'
import path from 'path'
import routes from './routes'

import './database'

class App {
  constructor() {
    this.server = express()

    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.server.use(cors('*'))
    // this.server.use(
    //   cors({
    //     origin: ['http://localhost:3000', 'http://localhost:3001'],
    //     credentials: true,
    //   })
    // )
    this.server.use(express.json())
    this.server.use(
      '/portraits',
      express.static(
        path.resolve(__dirname, '..', 'tmp', 'uploads', 'portraits')
      )
    )
    this.server.use(
      '/tokens',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads', 'tokens'))
    )
  }

  routes() {
    this.server.use(routes)
  }
}

export default new App().server
