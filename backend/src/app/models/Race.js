import { Sequelize, Model } from 'sequelize'

class Race extends Model {
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
    this.belongsTo(models.Person, { foreignKey: 'person_id', as: 'person' })
  }
}

export default Race
