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
      // Adicionar domínios de produção quando disponíveis
      process.env.FRONTEND_URL,
      /\.vercel\.app$/,
      /\.netlify\.app$/,
      /\.railway\.app$/,
      /\.onrender\.com$/,
    ].filter(Boolean)

    this.server.use(
      cors({
        origin: function (origin, callback) {
          // Permitir requests sem origin (mobile apps, etc.)
          if (!origin) return callback(null, true)

          // Verificar se a origin está na lista permitida
          const isAllowed = allowedOrigins.some(allowedOrigin => {
            if (typeof allowedOrigin === 'string') {
              return allowedOrigin === origin
            }
            if (allowedOrigin instanceof RegExp) {
              return allowedOrigin.test(origin)
            }
            return false
          })

          if (isAllowed) {
            callback(null, true)
          } else {
            callback(new Error('Not allowed by CORS'))
          }
        },
        credentials: true,
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
