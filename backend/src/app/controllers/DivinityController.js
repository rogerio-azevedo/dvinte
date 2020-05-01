import Divinity from '../models/Divinity'

class DivinityController {
  async index(req, res) {
    const list = await Divinity.findAll({
      order: [['name', 'ASC']],
    })

    return res.json(list)
  }

  async store(req, res) {
    const divinity = await Divinity.create(req.body)

    return res.json(divinity)
  }
}

export default new DivinityController()
