import { Sequelize, Model } from 'sequelize'

class ClassLevel extends Model {
  static init(sequelize) {
    super.init(
      {
        class_id: Sequelize.INTEGER,
        level_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    )

    return this
  }
}

export default ClassLevel
