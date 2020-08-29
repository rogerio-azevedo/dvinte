import { Sequelize, Model } from 'sequelize'

class GameMap extends Model {
  static init(sequelize) {
    super.init(
      {
        url: Sequelize.STRING,
        width: Sequelize.INTEGER,
        height: Sequelize.INTEGER,
        grid: Sequelize.BOOLEAN,
        fog: Sequelize.BOOLEAN,
        owner: Sequelize.INTEGER,
        type: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    )

    return this
  }
}

export default GameMap
