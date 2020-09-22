import CharacterToken from '../models/CharacterToken'
import { updateToken } from '../../websocket'

class CharacterTokenController {
  async index(req, res) {
    const list = await CharacterToken.findAll({
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
    const chartoken = await CharacterToken.create(req.body)

    return res.json(chartoken)
  }

  async update(req, res) {
    const char = await CharacterToken.findByPk(req.body.id)

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

    const list = await CharacterToken.findAll({
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

export default new CharacterTokenController()
