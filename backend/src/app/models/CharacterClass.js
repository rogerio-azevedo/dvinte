import { Sequelize, Model } from 'sequelize'

class CharacterClass extends Model {
  static init(sequelize) {
    super.init(
      {
        character_id: Sequelize.INTEGER,
        class_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    )

    return this
  }

  // static associate(models) {
  //   this.hasMany(models.Person, { foreignKey: 'person_id', as: 'person' })
  //   this.hasMany(models.Class, { foreignKey: 'class_id', as: 'class' })
  // }
}

export default CharacterClass
