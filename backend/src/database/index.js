import Sequelize from 'sequelize'
import mongoose from 'mongoose'

import Alignment from '../app/models/Alignment'
import Class from '../app/models/Class'
import Divinity from '../app/models/Divinity'
import Character from '../app/models/Character'
import CharacterClass from '../app/models/CharacterClass'
import Portrait from '../app/models/Portrait'
import Race from '../app/models/Race'
import User from '../app/models/User'
import Campaign from '../app/models/Campaign'
import Attribute from '../app/models/Attribute'
import AttributeTemp from '../app/models/AttributeTemp'
import Armor from '../app/models/Armor'
import Weapon from '../app/models/Weapon'

import databaseConfig from '../config/database'

const models = [
  Alignment,
  Class,
  Divinity,
  Character,
  CharacterClass,
  Portrait,
  Campaign,
  Race,
  User,
  Attribute,
  AttributeTemp,
  Armor,
  Weapon,
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
