import { Sequelize, Model } from 'sequelize'

class Level extends Model {
  static init(sequelize) {
    super.init(
      {
        level: Sequelize.INTEGER,
        name: Sequelize.STRING,
      },
      {
        sequelize,
      }
    )

    return this
  }

  static associate(models) {
    this.belongsToMany(models.Class, {
      foreignKey: 'level_id',
      through: 'class-level',
      as: 'levelclass',
    })
  }
}

export default Level
