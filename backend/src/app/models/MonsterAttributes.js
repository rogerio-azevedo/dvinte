import { Sequelize, Model } from 'sequelize'

class MonsterAttributes extends Model {
  static init(sequelize) {
    super.init(
      {
        strength: Sequelize.INTEGER,
        dexterity: Sequelize.INTEGER,
        contitution: Sequelize.INTEGER,
        inteligence: Sequelize.INTEGER,
        wisdom: Sequelize.INTEGER,
        charisma: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    )

    return this
  }
}

export default MonsterAttributes
