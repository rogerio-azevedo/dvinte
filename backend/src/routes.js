import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/multer'

import authMiddleware from './app/middlewares/auth'

import AlignmentController from './app/controllers/AlignmentController'
import ClassController from './app/controllers/ClassController'
import DivinityController from './app/controllers/DivinityController'
import CharacterController from './app/controllers/CharacterController'
import MyProfileController from './app/controllers/MyProfileController'

import PortraitController from './app/controllers/PortraitController'
import TokenController from './app/controllers/TokenController'
import CharTokenController from './app/controllers/CharTokenController'
import RaceController from './app/controllers/RaceController'

import SessionController from './app/controllers/SessionController'
import UserController from './app/controllers/UserController'

import CombatController from './app/controllers/CombatController'

import CampaignController from './app/controllers/CampaignController'
import AttributeController from './app/controllers/AttributeController'
import BaseAttackController from './app/controllers/BaseAttackController'
import BaseResistController from './app/controllers/BaseResistController'

import WeaponController from './app/controllers/WeaponController'
import ArmorController from './app/controllers/ArmorController'
import EquipmentController from './app/controllers/EquipmentController'

import InitiativeController from './app/controllers/InitiativeController'
import HealthController from './app/controllers/HealthController'

import NotesController from './app/controllers/NotesController'
import DamageController from './app/controllers/DamageController'
import CharacterWeaponController from './app/controllers/CharacterWeaponController'
import CharacterArmorController from './app/controllers/CharacterArmorController'

import AttributeTempController from './app/controllers/AttributeTempController'
import CharacterEquipmentController from './app/controllers/CharacterEquipmentController'

const routes = new Router()
const upload = multer(multerConfig)

routes.post('/sessions', SessionController.store)
routes.post('/users', UserController.store)

routes.get('/check', (req, res) => res.send('API ONLINE'))

routes.use(authMiddleware)

routes.post('/combats', CombatController.store)
routes.get('/combats', CombatController.index)
routes.get('/combats/:id', CombatController.show)

routes.post('/notes', NotesController.store)
routes.get('/notes', NotesController.index)

routes.post('/initiatives', InitiativeController.store)
routes.get('/initiatives', InitiativeController.index)
routes.delete('/initiatives', InitiativeController.destroy)

routes.get('/users', UserController.index)
routes.put('/users', UserController.update)

routes.get('/myprofile', MyProfileController.index)

routes.post('/alignments', AlignmentController.store)
routes.get('/alignments', AlignmentController.index)
routes.get('/alignments/:id', AlignmentController.show)

routes.post('/classes', ClassController.store)
routes.get('/classes', ClassController.index)
routes.get('/classes/:id', ClassController.show)

routes.post('/divinities', DivinityController.store)
routes.get('/divinities', DivinityController.index)
routes.get('/divinities/:id', DivinityController.show)

routes.post('/characters', CharacterController.store)
routes.get('/characters', CharacterController.index)
routes.get('/characters/:id', CharacterController.show)
routes.get('/characters/:character_id/classes', ClassController.index)

routes.post('/portraits', upload.single('file'), PortraitController.store)
routes.get('/portraits', PortraitController.index)
routes.get('/portraits/:id', PortraitController.show)

routes.post('/tokens', upload.single('file'), TokenController.store)
routes.get('/tokens', TokenController.index)

routes.get('/chartokens', CharTokenController.index)
routes.post('/chartokens', CharTokenController.store)
routes.put('/chartokens', CharTokenController.update)

routes.post('/attributes', AttributeController.store)
routes.get('/attributes', AttributeController.index)

routes.post('/races', RaceController.store)
routes.get('/races', RaceController.index)
routes.get('/races/:id', RaceController.show)

routes.post('/campaigns', CampaignController.store)
routes.get('/campaigns', CampaignController.index)

routes.post('/baseattack', BaseAttackController.store)
routes.get('/baseattack', BaseAttackController.index)

routes.post('/baseresist', BaseResistController.store)
routes.get('/baseresist', BaseResistController.index)

routes.post('/weapons', WeaponController.store)
routes.get('/weapons', WeaponController.index)

routes.post('/equipments', EquipmentController.store)
routes.get('/equipments', EquipmentController.index)

routes.post('/armors', ArmorController.store)
routes.get('/armors', ArmorController.index)

routes.put('/healthnow', HealthController.update)

routes.get('/damages', DamageController.index)

routes.post('/characterweapons', CharacterWeaponController.store)
routes.post('/characterarmors', CharacterArmorController.store)
routes.post('/characterequipments', CharacterEquipmentController.store)
routes.delete('/characterequipments/:id', CharacterEquipmentController.destroy)

routes.get('/attributetemps', AttributeTempController.index)
routes.get('/attributetemps/:id', AttributeTempController.show)
routes.post('/attributetemps', AttributeTempController.store)
routes.put('/attributetemps/:id', AttributeTempController.update)

export default routes
