import { Sequelize, Model } from 'sequelize'

class GameMap extends Model {
  static init(sequelize) {
    super.init(
      {
        battle: Sequelize.STRING,
        world: Sequelize.STRING,
        grid: Sequelize.BOOLEAN,
        fog: Sequelize.BOOLEAN,
        owner: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    )

    return this
  }
}

export default GameMap
