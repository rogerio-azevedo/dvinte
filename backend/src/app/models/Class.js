import { Sequelize, Model } from 'sequelize'

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
      through: 'characters-class',
      as: 'characters',
    })
  }
}

export default Class
