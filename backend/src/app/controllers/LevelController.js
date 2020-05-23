import Level from '../models/Level'

class LevelController {
  async index(req, res) {
    const classes = await Level.findAll({
      order: [['level', 'ASC']],
    })

    return res.json(classes)
  }

  async store(req, res) {
    const classes = await Level.create(req.body)

    return res.json(classes)
  }
}

export default new LevelController()
