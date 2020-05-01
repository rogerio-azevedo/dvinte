import Race from '../models/Race'

class RaceController {
  async index(req, res) {
    const list = await Race.findAll({
      order: [['name', 'ASC']],
    })

    return res.json(list)
  }

  async store(req, res) {
    const race = await Race.create(req.body)

    return res.json(race)
  }
}

export default new RaceController()
