import CharToken from '../models/CharToken'
import { updateToken } from '../../websocket'

class CharTokenController {
  async index(req, res) {
    const list = await CharToken.findAll({
      attributes: [
        'id',
        'character_id',
        'x',
        'y',
        'width',
        'height',
        'rotation',
      ],
      include: [
        {
          association: 'tokens',
          attributes: ['id', 'path', 'url'],
        },
      ],
    })

    const tokens = list.map(t => ({
      id: t.id,
      character_id: t.character_id,
      x: t.x,
      y: t.y,
      width: t.width,
      height: t.height,
      rotation: t.rotation,
      image: t && t.tokens.url,
    }))

    return res.json(tokens)
  }

  async store(req, res) {
    const chartoken = await CharToken.create(req.body)

    return res.json(chartoken)
  }

  async update(req, res) {
    const char = await CharToken.findByPk(req.body.id)

    const { x } = req.body
    const { y } = req.body
    const { width } = req.body
    const { height } = req.body
    const { rotation } = req.body

    if (x && y && rotation && width && height) {
      await char.update({
        x,
        y,
        width,
        height,
        rotation: Math.floor(rotation),
      })
    } else if (x && y && rotation) {
      await char.update({
        x,
        y,
        rotation: rotation + 45,
      })
    } else if (x && y) {
      await char.update({
        x,
        y,
      })
    } else {
      await char.update({
        rotation: rotation + 45,
      })
    }

    const list = await CharToken.findAll({
      attributes: [
        'id',
        'character_id',
        'x',
        'y',
        'width',
        'height',
        'rotation',
      ],
      include: [
        {
          association: 'tokens',
          attributes: ['id', 'path', 'url'],
        },
      ],
    })

    const tokens = list.map(t => ({
      id: t.id,
      character_id: t.character_id,
      x: t.x,
      y: t.y,
      width: t.width,
      height: t.height,
      rotation: t.rotation,
      image: t && t.tokens.url,
    }))

    updateToken(tokens)

    return res.json(tokens)
  }
}

export default new CharTokenController()
