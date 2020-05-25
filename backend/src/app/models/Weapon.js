import { Sequelize, Model } from 'sequelize'

class Weapon extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        dice: Sequelize.STRING,
        multiplier: Sequelize.INTEGER,
        critical: Sequelize.STRING,
        range: Sequelize.STRING,
        type: Sequelize.STRING,
        material: Sequelize.STRING,
        magic: Sequelize.STRING,
        weight: Sequelize.FLOAT,
        special: Sequelize.STRING,
        price: Sequelize.STRING,
      },
      {
        sequelize,
      }
    )

    return this
  }
}

export default Weapon
