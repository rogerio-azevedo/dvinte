import AttributeTemp from '../models/AttributeTemp'

class AttributeTempController {
  async index(req, res) {
    const atts = await AttributeTemp.findAll({})

    return res.json(atts)
  }

  async show(req, res) {
    const atts = await AttributeTemp.findOne({
      where: {
        character_id: req.params.id,
      },
    })
    console.log(attrs)
    return res.json(atts)
  }

  async store(req, res) {
    const atts = await AttributeTemp.create(req.body)

    return res.json(atts)
  }

  async update(req, res) {
    const atts = await AttributeTemp.update(req.body)

    return res.json(atts)
  }
}

export default new AttributeTempController()
