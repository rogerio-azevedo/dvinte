import Weapon from '../models/Weapon'

class WeaponController {
  async index(req, res) {
    const list = await Weapon.findAll({
      where: {
        character_id: req.query.cod,
      },
      order: [['name', 'ASC']],
    })

    return res.json(list)
  }

  async store(req, res) {
    const divinity = await Weapon.create(req.body)

    return res.json(divinity)
  }
}

export default new WeaponController()
