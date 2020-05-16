import { Sequelize, Model } from 'sequelize'

class Character extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        age: Sequelize.INTEGER,
        gender: Sequelize.INTEGER,
        skin: Sequelize.STRING,
        eye: Sequelize.STRING,
        hair: Sequelize.STRING,
        height: Sequelize.STRING,
        weight: Sequelize.STRING,
        is_ativo: Sequelize.BOOLEAN,
        level: Sequelize.INTEGER,
        size: Sequelize.INTEGER,
        exp: Sequelize.INTEGER,
        health: Sequelize.INTEGER,
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

    this.belongsTo(models.Portrait, {
      foreignKey: 'portrait_id',
      as: 'portrait',
    })

    this.belongsTo(models.Alignment, {
      foreignKey: 'alignment_id',
      as: 'alignment',
    })

    this.belongsTo(models.Race, {
      foreignKey: 'race_id',
      as: 'race',
    })

    this.belongsTo(models.Divinity, {
      foreignKey: 'divinity_id',
      as: 'divinity',
    })

    this.hasOne(models.Attribute, {
      as: 'attribute',
      foreignKey: 'character_id',
    })
  }
}

export default Character
