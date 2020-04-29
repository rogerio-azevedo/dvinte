import Person from '../models/Person'

class PersonController {
  async index(req, res) {
    const list = await Person.findAll()

    return res.json(list)
  }

  async store(req, res) {
    const person = await Person.create(req.body)

    return res.json(person)
  }
}

export default new PersonController()
