import Line from '../schemas/Line'

import { addLine } from '../../websocket'

class LinesController {
  async index(req, res) {
    const lines = await Line.find()

    return res.json(lines)
  }

  async store(req, res) {
    const lines = req.body

    // console.log(lines)

    addLine(lines)

    return res.json(lines)
  }

  async destroy(req, res) {
    const inits = await Line.deleteMany({})

    return res.json(inits)
  }
}

export default new LinesController()
