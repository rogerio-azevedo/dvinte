import jwt from 'jsonwebtoken'
import User from '../models/User'
// import Character from '../models/Character'
import authConfig from '../../config/auth'

class SessionController {
  async store(req, res) {
    const { email, password } = req.body

    const user = await User.findOne({
      where: { email },
      ibutes: ['id', 'name', 'email', 'phone'],
      // include: [
      //   {
      //     model: Character,
      //     as: 'character',
      //     where: { is_ativo: true },
      //     attributes: [
      //       'id',
      //       'name',
      //       'age',
      //       'gender',
      //       'skin',
      //       'eye',
      //       'hair',
      //       'height',
      //       'weight',
      //       'level',
      //       'size',
      //       'exp',
      //       'health',
      //       'health_now',
      //       'is_ativo',
      //     ],
      //     include: [
      //       {
      //         association: 'attribute',
      //         attributes: [
      //           'strength',
      //           'dexterity',
      //           'contitution',
      //           'inteligence',
      //           'wisdom',
      //           'charisma',
      //         ],
      //       },
      //       {
      //         association: 'attribute_temp',
      //         attributes: [
      //           'strength',
      //           'dexterity',
      //           'contitution',
      //           'inteligence',
      //           'wisdom',
      //           'charisma',
      //         ],
      //       },
      //       {
      //         association: 'classes',
      //         attributes: ['name', 'attack', 'fortitude', 'reflex', 'will'],
      //         through: { attributes: ['level'] },
      //       },
      //       {
      //         association: 'portrait',
      //         attributes: ['id', 'path', 'url'],
      //       },
      //       {
      //         association: 'chartoken',
      //         attributes: ['x', 'y', 'width', 'height', 'rotation'],
      //         include: [
      //           {
      //             association: 'tokens',
      //             attributes: ['id', 'path', 'url'],
      //           },
      //         ],
      //       },
      //       {
      //         association: 'race',
      //         attributes: ['name'],
      //       },
      //       {
      //         association: 'divinity',
      //         attributes: ['name'],
      //       },
      //       {
      //         association: 'armor',
      //         attributes: [
      //           'id',
      //           'name',
      //           'type',
      //           'bonus',
      //           'dexterity',
      //           'penalty',
      //           'magic',
      //           'displacement',
      //           'weight',
      //           'special',
      //           'price',
      //         ],
      //         as: 'armor',
      //       },
      //       {
      //         association: 'weapon',
      //         attributes: [
      //           'id',
      //           'name',
      //           'dice',
      //           'multiplier',
      //           'critical',
      //           'range',
      //           'type',
      //           'material',
      //           'magic',
      //           'weight',
      //           'special',
      //           'price',
      //           'hit',
      //           'damage',
      //         ],
      //         as: 'weapon',
      //       },
      //     ],
      //   },
      // ],
    })

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado!' })
    }
    if (user && !(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'A senha está incorreta!' })
    }

    const { id, name, character } = user

    return res.json({
      user: {
        id,
        name,
        email,
        character,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    })
  }
}

export default new SessionController()
