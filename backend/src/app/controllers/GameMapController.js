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
        type: Number(req.query.type),
      },
    })
    return res.json(map)
  }

  async store(req, res) {
    const newMap = {
      campaign_id: 1,
      url: req.body?.url,
      grid: req.body.grid,
      fog: req.body?.fog,
      owner: Number(req.body?.owner),
      type: Number(req.body?.type),
    }

    const gameMap = await GameMap.create(newMap)

    return res.json(gameMap)
  }
}

export default new GameMapController()
