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
        'enabled',
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
      enabled: t.enabled,
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
    const { enabled } = req.body

    if (x && y && rotation && width && height) {
      await char.update({
        x: Math.round(x),
        y: Math.round(y),
        width: Math.round(width),
        height: Math.round(height),
        rotation: Math.round(rotation),
      })
    } else if (x && y && rotation) {
      await char.update({
        x: Math.round(x),
        y: Math.round(y),
        rotation: Math.round(rotation),
      })
    } else if (x && y) {
      await char.update({
        x: Math.round(x),
        y: Math.round(y),
      })
    } else if (rotation) {
      await char.update({
        rotation: Math.round(rotation),
      })
    } else {
      await char.update({
        enabled: enabled,
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
        'enabled',
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
      enabled: t.enabled,
      image: t && t.tokens.url,
    }))

    updateToken(tokens)

    return res.json(tokens)
  }

  async destroy(req, res) {
    await CharacterToken.destroy({
      where: {
        id: req.params.id,
      },
    })

    return res.status(201).send()
  }
}

export default new CharacterTokenController()
