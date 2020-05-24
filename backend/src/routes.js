import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/multer'

import authMiddleware from './app/middlewares/auth'

import AlignmentController from './app/controllers/AlignmentController'
import ClassController from './app/controllers/ClassController'
import DivinityController from './app/controllers/DivinityController'
import CharacterController from './app/controllers/CharacterController'

import PortraitController from './app/controllers/PortraitController'
import RaceController from './app/controllers/RaceController'

import SessionController from './app/controllers/SessionController'
import UserController from './app/controllers/UserController'

import ChatController from './app/controllers/ChatController'
import CampaignController from './app/controllers/CampaignController'
import AttributeController from './app/controllers/AttributeController'

const routes = new Router()
const upload = multer(multerConfig)

routes.post('/sessions', SessionController.store)
routes.post('/users', UserController.store)

routes.get('/check', (req, res) => res.send('API ONLINE'))

routes.use(authMiddleware)

routes.post('/chats', ChatController.store)
routes.get('/chats', ChatController.index)

routes.get('/users', UserController.index)
routes.put('/users', UserController.update)

routes.post('/alignments', AlignmentController.store)
routes.get('/alignments', AlignmentController.index)

routes.post('/classes', ClassController.store)
routes.get('/classes', ClassController.index)

routes.post('/divinities', DivinityController.store)
routes.get('/divinities', DivinityController.index)

routes.post('/characters', CharacterController.store)
routes.get('/characters', CharacterController.index)
routes.get('/characters/:id', CharacterController.show)
routes.get('/characters/:character_id/classes', ClassController.index)

routes.post('/portraits', upload.single('file'), PortraitController.store)
routes.get('/portraits', PortraitController.index)

routes.post('/attributes', AttributeController.store)
routes.get('/attributes', AttributeController.index)

routes.post('/races', RaceController.store)
routes.get('/races', RaceController.index)

routes.post('/campaigns', CampaignController.store)
routes.get('/campaigns', CampaignController.index)

export default routes
