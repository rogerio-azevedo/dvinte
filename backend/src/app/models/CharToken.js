import { Sequelize, Model } from 'sequelize'

class CharToken extends Model {
  static init(sequelize) {
    super.init(
      {
        x: Sequelize.FLOAT,
        y: Sequelize.FLOAT,
        width: Sequelize.FLOAT,
        height: Sequelize.FLOAT,
        rotation: Sequelize.FLOAT,
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
