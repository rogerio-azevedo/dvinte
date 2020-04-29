import { Router } from 'express'

import authMiddleware from './app/middlewares/auth'

import AlignmentController from './app/controllers/AlignmentController'
import ClassController from './app/controllers/ClassController'
import DivinityController from './app/controllers/DivinityController'
import PersonController from './app/controllers/PersonController'
import PortraitController from './app/controllers/PortraitController'
import RaceController from './app/controllers/RaceController'

import SessionController from './app/controllers/SessionController'
import UserController from './app/controllers/UserController'

const routes = new Router()

//routes.get('/sessions', SessionController.index)

routes.post('/sessions', SessionController.store)
routes.post('/users', UserController.store)

routes.post('/alignments', AlignmentController.store)
routes.post('/classes', ClassController.store)
routes.post('/divinities', DivinityController.store)
routes.post('/persons', PersonController.store)
routes.post('/portraits', PortraitController.store)
routes.post('/races', RaceController.store)

routes.use(authMiddleware)

// routes.get("/users", UserController.index)
// routes.put("/users", UserController.update)

export default routes
