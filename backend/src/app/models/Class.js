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
}

export default Class
