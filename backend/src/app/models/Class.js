import { Sequelize, Model } from 'sequelize'
import CharacterClass from './CharacterClass'

class Class extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    )

    return this
  }

  static associate(models) {
    this.belongsToMany(models.Character, {
      foreignKey: 'class_id',
      through: CharacterClass,
      as: 'char_class',
    })
  }
}

export default Class
