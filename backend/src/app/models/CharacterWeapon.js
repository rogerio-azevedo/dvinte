import { Sequelize, Model } from 'sequelize'

class CharacterWeapon extends Model {
  static init(sequelize) {
    super.init(
      {
        character_id: Sequelize.INTEGER,
        weapon_id: Sequelize.INTEGER,
        hit: Sequelize.INTEGER,
        damage: Sequelize.INTEGER,
        element: Sequelize.INTEGER,
        crit_mod: Sequelize.STRING,
        crit_from_mod: Sequelize.STRING,
        description: Sequelize.STRING,
      },
      {
        sequelize,
      }
    )

    return this
  }
}

export default CharacterWeapon
