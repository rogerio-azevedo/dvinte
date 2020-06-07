import ClassTable from '../models/ClassTable'

class ClassTableController {
  async index(req, res) {
    const classes = await ClassTable.findAll({
      order: [
        ['class_id', 'ASC'],
        ['level', 'ASC'],
      ],
    })

    return res.json(classes)
  }

  async store(req, res) {
    const data = req.body

    const result = ClassTable.bulkCreate(data, { returning: true })

    return res.json(result)
  }
}

export default new ClassTableController()
