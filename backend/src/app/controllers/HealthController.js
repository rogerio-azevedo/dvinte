import Character from '../models/Character'

class HealthController {
  async update(req, res) {
    const char = await Character.findByPk(req.query.id)

    let new_health = 0

    if (char.health_now + req.body.newHealth >= char.health) {
      new_health = char.health
    } else {
      new_health = char.health_now + req.body.newHealth
    }

    const newChar = await char.update({
      health_now: new_health,
    })

    return res.json(newChar)
  }
}

export default new HealthController()
