import GameMap from '../models/GameMap'

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
      width: Number(req.body?.width),
      height: Number(req.body?.height),
      grid: req.body.grid,
      fog: req.body?.fog,
      owner: Number(req.body?.owner),
      type: Number(req.body?.type),
    }

    console.log(newMap)
    const gameMap = await GameMap.create(newMap)

    return res.json(gameMap)
  }
}

export default new GameMapController()
