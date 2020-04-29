import Sequelize from 'sequelize'

// import mongoose from 'mongoose';

import Alignment from '../app/models/Alignment'
import Class from '../app/models/Class'
import Divinity from '../app/models/Divinity'
import Person from '../app/models/Person'
import PersonClass from '../app/models/PersonClass'
import Portrait from '../app/models/Portrait'
import Race from '../app/models/Race'
import User from '../app/models/User'

import databaseConfig from '../config/database'

const models = [
  Alignment,
  Class,
  Divinity,
  Person,
  PersonClass,
  Portrait,
  Race,
  User,
]

class Database {
  constructor() {
    this.init()
    // this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig)

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models))
  }

  // mongo() {
  //   this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
  //     useNewUrlParser: true,
  //     useFindAndModify: true,
  //   });
  // }
}

export default new Database()
