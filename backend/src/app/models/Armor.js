import { Sequelize, Model } from 'sequelize'

class Armor extends Model {
  static init(sequelize) {
    super.init(
      {
        bonus: Sequelize.INTEGER,
        dexterity: Sequelize.INTEGER,
        penalty: Sequelize.INTEGER,
        magic: Sequelize.INTEGER,
        displacement: Sequelize.INTEGER,
        weight: Sequelize.DOUBLE,
        special: Sequelize.STRING,
      },
      {
        sequelize,
      }
    )

    return this
  }
}

export default Armor
