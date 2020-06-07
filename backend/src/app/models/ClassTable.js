import { Sequelize, Model } from 'sequelize'

class ClassTable extends Model {
  static init(sequelize) {
    super.init(
      {
        level: Sequelize.INTEGER,
        base_attack: Sequelize.INTEGER,
        base_attack2: Sequelize.INTEGER,
        base_attack3: Sequelize.INTEGER,
        base_attack4: Sequelize.INTEGER,
        fortitude: Sequelize.INTEGER,
        reflex: Sequelize.INTEGER,
        will: Sequelize.INTEGER,
        special: Sequelize.STRING,
      },
      {
        sequelize,
      }
    )

    return this
  }

  static associate(models) {
    this.belongsTo(models.Class, {
      foreignKey: 'class_id',
      as: 'classtables',
    })
  }
}

export default ClassTable
