import Class from '../models/Class'

class ClassController {
  async index(req, res) {
    const list = await Class.findAll()

    return res.json(list)
  }

  async store(req, res) {
    const classes = await Class.create(req.body)

    return res.json(classes)
  }
}

export default new ClassController()
