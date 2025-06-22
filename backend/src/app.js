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
    // Configurar CORS para desenvolvimento e produção
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://dvinte-react.vercel.app',
      process.env.FRONTEND_URL,
    ].filter(Boolean)

    this.server.use(
      cors({
        origin: function (origin, callback) {
          // Permitir requests sem origin (mobile apps, etc.)
          if (!origin) return callback(null, true)

          // Verificar se a origin está na lista permitida ou se é um domínio .vercel.app
          const isAllowed =
            allowedOrigins.includes(origin) ||
            (origin && origin.endsWith('.vercel.app')) ||
            (origin && origin.endsWith('.onrender.com'))

          if (isAllowed) {
            callback(null, true)
          } else {
            console.log('CORS blocked origin:', origin)
            callback(new Error('Not allowed by CORS'))
          }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
      })
    )
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
