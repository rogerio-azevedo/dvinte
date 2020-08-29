import Sequelize from 'sequelize'
import mongoose from 'mongoose'

import Alignment from '../app/models/Alignment'
import Class from '../app/models/Class'
import Divinity from '../app/models/Divinity'
import Character from '../app/models/Character'
import CharacterArmor from '../app/models/CharacterArmor'
import CharacterClass from '../app/models/CharacterClass'
import CharacterWeapon from '../app/models/CharacterWeapon'
import CharacterEquipment from '../app/models/CharacterEquipment'
import Portrait from '../app/models/Portrait'
import Token from '../app/models/Token'
import CharToken from '../app/models/CharToken'
import Race from '../app/models/Race'
import User from '../app/models/User'
import Campaign from '../app/models/Campaign'
import Attribute from '../app/models/Attribute'
import AttributeTemp from '../app/models/AttributeTemp'
import Armor from '../app/models/Armor'
import Weapon from '../app/models/Weapon'
import Equipment from '../app/models/Equipment'
import BaseAttack from '../app/models/BaseAttack'
import BaseResist from '../app/models/BaseResist'
import GameMap from '../app/models/GameMap'

import databaseConfig from '../config/database'

const models = [
  Alignment,
  Class,
  Divinity,
  Character,
  CharacterArmor,
  CharacterClass,
  CharacterWeapon,
  Portrait,
  Token,
  CharToken,
  Campaign,
  Race,
  User,
  Attribute,
  AttributeTemp,
  Armor,
  Weapon,
  Equipment,
  CharacterEquipment,
  BaseAttack,
  BaseResist,
  GameMap,
]

class Database {
  constructor() {
    this.init()
    this.mongo()
  }

  init() {
    this.connection = new Sequelize(databaseConfig)

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models))
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    })
  }
}

export default new Database()
