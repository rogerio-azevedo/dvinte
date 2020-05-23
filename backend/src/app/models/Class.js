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
      through: 'character-class',
      as: 'characters',
    })

    this.belongsToMany(models.Level, {
      foreignKey: 'class_id',
      through: 'class-level',
      as: 'classlevel',
    })
  }
}

export default Class
