import Portrait from '../models/Portrait'

class PortraitController {
  async index(req, res) {
    const list = await Portrait.findAll()

    return res.json(list)
  }

  async store(req, res) {
    const portrait = await Portrait.create(req.body)

    return res.json(portrait)
  }
}

export default new PortraitController()
