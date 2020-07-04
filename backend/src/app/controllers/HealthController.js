import Character from '../models/Character'

class HealthController {
  async update(req, res) {
    const char = await Character.findByPk(req.query.id)

    const { newHealth } = req.body

    function setHealth() {
      let new_health = 0

      if (char && char.health_now + newHealth >= char.health) {
        new_health = char.health
      } else {
        new_health = char.health_now + newHealth
      }
      return new_health
    }

    const newChar = await char.update({
      health_now: setHealth(),
    })

    return res.json(newChar)
  }
}

export default new HealthController()
