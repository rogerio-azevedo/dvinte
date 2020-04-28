import { Sequelize, Model } from 'sequelize'

class Person extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        is_ativo: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    )

    return this
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    })
  }
}

export default Person
