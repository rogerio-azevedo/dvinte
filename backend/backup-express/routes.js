import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/multer.js'

import authMiddleware from './app/middlewares/auth.js'

import AlignmentController from './app/controllers/AlignmentController.js'
import ClassController from './app/controllers/ClassController.js'
import DivinityController from './app/controllers/DivinityController.js'
import CharacterController from './app/controllers/CharacterController.js'
import MyProfileController from './app/controllers/MyProfileController.js'

import PortraitController from './app/controllers/PortraitController.js'
import TokenController from './app/controllers/TokenController.js'
import RaceController from './app/controllers/RaceController.js'

import SessionController from './app/controllers/SessionController.js'
import UserController from './app/controllers/UserController.js'

import CombatController from './app/controllers/CombatController.js'

import CampaignController from './app/controllers/CampaignController.js'
import AttributeController from './app/controllers/AttributeController.js'
import BaseAttackController from './app/controllers/BaseAttackController.js'
import BaseResistController from './app/controllers/BaseResistController.js'

import WeaponController from './app/controllers/WeaponController.js'
import ArmorController from './app/controllers/ArmorController.js'
import EquipmentController from './app/controllers/EquipmentController.js'

import InitiativeController from './app/controllers/InitiativeController.js'
import HealthController from './app/controllers/HealthController.js'

import NotesController from './app/controllers/NotesController.js'
import DamageController from './app/controllers/DamageController.js'

import CharacterTokenController from './app/controllers/CharacterTokenController.js'
import CharacterWeaponController from './app/controllers/CharacterWeaponController.js'
import CharacterArmorController from './app/controllers/CharacterArmorController.js'
import CharacterEquipmentController from './app/controllers/CharacterEquipmentController.js'

import AttributeTempController from './app/controllers/AttributeTempController.js'
import GameMapController from './app/controllers/GameMapController.js'
import MonsterController from './app/controllers/MonsterController.js'
import MonsterHealthController from './app/controllers/MonsterHealthController.js'

const routes = new Router()
const upload = multer(multerConfig)

routes.post('/sessions', SessionController.store)
routes.post('/users', UserController.store)

// Health check routes (sem autenticação)
routes.get('/', (req, res) => res.json({ message: 'server UP' }))
routes.get('/health', (req, res) =>
  res.json({ message: 'server UP', status: 'healthy' })
)
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

routes.post('/monsters', MonsterController.store)
routes.get('/monsters', MonsterController.index)
routes.get('/monsters/:id', MonsterController.show)

routes.post('/portraits', upload.single('file'), PortraitController.store)
routes.get('/portraits', PortraitController.index)
routes.get('/portraits/:id', PortraitController.show)

routes.post('/tokens', upload.single('file'), TokenController.store)
routes.get('/tokens', TokenController.index)

routes.get('/chartokens', CharacterTokenController.index)
routes.post('/chartokens', CharacterTokenController.store)
routes.put('/chartokens', CharacterTokenController.update)
routes.delete('/chartokens/:id', CharacterTokenController.destroy)

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
routes.put('/monsterhealthnow', MonsterHealthController.update)

routes.get('/maps', GameMapController.index)
routes.get('/maps/:id', GameMapController.show)
routes.post('/maps', GameMapController.store)

routes.get('/damages', DamageController.index)

routes.post('/characterweapons', CharacterWeaponController.store)
routes.delete('/characterweapons/:id', CharacterWeaponController.destroy)

routes.post('/characterarmors', CharacterArmorController.store)
routes.delete('/characterarmors/:id', CharacterArmorController.destroy)

routes.post('/characterequipments', CharacterEquipmentController.store)
routes.delete('/characterequipments/:id', CharacterEquipmentController.destroy)

routes.get('/attributetemps', AttributeTempController.index)
routes.get('/attributetemps/:id', AttributeTempController.show)
routes.post('/attributetemps', AttributeTempController.store)
routes.put('/attributetemps/:id', AttributeTempController.update)

export default routes
