import GameMap from '../models/GameMap'
import sizeOf from 'image-size'
import url from 'url'
import https from 'https'

class GameMapController {
  async index(req, res) {
    const map = await GameMap.findAll()

    return res.json(map)
  }

  async show(req, res) {
    const map = await GameMap.findOne({
      where: {
        campaign_id: Number(req.params.id),
      },
    })
    return res.json(map)
  }

  async store(req, res) {
    const newMap = {
      campaign_id: 1,
      battle: req.body?.battle,
      world: req.body?.world,
      grid: req.body.grid || true,
      fog: req.body?.fog || false,
      owner: Number(req.body?.owner) || 1,
    }

    const gameMap = await GameMap.create(newMap)

    return res.json(gameMap)
  }
}

export default new GameMapController()
