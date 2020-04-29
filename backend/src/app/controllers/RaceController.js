import Race from '../models/Race'

class RaceController {
  async index(req, res) {
    const list = await Race.findAll()

    return res.json(list)
  }

  async store(req, res) {
    const race = await Race.create(req.body)

    return res.json(race)
  }
}

export default new RaceController()
