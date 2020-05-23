import { Sequelize, Model } from 'sequelize'

class Level extends Model {
  static init(sequelize) {
    super.init(
      {
        level: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    )

    return this
  }

  static associate(models) {
    this.belongsTo(models.Class, {
      foreignKey: 'class_id',
      as: 'class',
    })

    this.belongsTo(models.Character, {
      foreignKey: 'character_id',
      as: 'characters',
    })
  }
}

export default Level
