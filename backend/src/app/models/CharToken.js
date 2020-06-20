import { Sequelize, Model } from 'sequelize'

class CharToken extends Model {
  static init(sequelize) {
    super.init(
      {
        x: Sequelize.FLOAT,
        y: Sequelize.FLOAT,
        width: Sequelize.INTEGER,
        height: Sequelize.INTEGER,
        rotation: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    )

    return this
  }

  static associate(models) {
    this.belongsTo(models.Token, {
      foreignKey: 'token_id',
      as: 'tokens',
    })
  }
}

export default CharToken
