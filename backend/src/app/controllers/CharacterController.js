import Character from '../models/Character'

class CharacterController {
  async index(req, res) {
    const list = await Character.findAll()

    return res.json(list)
  }

  async store(req, res) {
    const person = await Character.create(req.body)

    return res.json(person)
  }
}

export default new CharacterController()
