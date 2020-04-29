import { Sequelize, Model } from 'sequelize'

class PersonClass extends Model {
  static init(sequelize) {
    super.init({
      sequelize,
    })

    return this
  }

  static associate(models) {
    this.hasMany(models.Person, { foreignKey: 'person_id', as: 'person' })
    this.hasMany(models.Class, { foreignKey: 'class_id', as: 'class' })
  }
}

export default PersonClass
