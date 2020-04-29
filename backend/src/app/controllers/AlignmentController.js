import Alignment from '../models/Alignment'

class AlignmentController {
  async index(req, res) {
    const list = await Alignment.findAll()

    return res.json(list)
  }

  async store(req, res) {
    const alignments = await Alignment.create(req.body)

    return res.json(alignments)
  }
}

export default new AlignmentController()
