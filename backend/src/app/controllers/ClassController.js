import Class from '../models/Class'

class ClassController {
  async index(req, res) {
    const classes = await Class.findAll()

    return res.json(classes)
  }

  async store(req, res) {
    const classes = await Class.create(req.body)

    return res.json(classes)
  }
}

export default new ClassController()
