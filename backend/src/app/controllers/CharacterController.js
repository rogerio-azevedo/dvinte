import Character from '../models/Character'
import Portrait from '../models/Portrait'
import Divinity from '../models/Divinity'
import Alignment from '../models/Alignment'
import Race from '../models/Race'
import Attribute from '../models/Attribute'
import User from '../models/User'

class CharacterController {
  async index(req, res) {
    const list = await Character.findAll({
      where: {
        is_ativo: true,
      },
      attributes: ['id', 'name', 'gender', 'health', 'exp', 'skin', 'level'],
      include: [
        {
          model: Portrait,
          as: 'portrait',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: Divinity,
          as: 'divinity',
          attributes: ['name'],
        },
        {
          model: Alignment,
          as: 'alignment',
          attributes: ['name'],
        },
        {
          model: Race,
          as: 'race',
          attributes: ['name'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
        {
          model: Attribute,
          as: 'attribute',
        },
      ],
      order: [['name', 'ASC']],
    })

    const chars = list.map(c => ({
      id: c.id,
      name: c.name,
      health: c.health,
      exp: c.exp,
      skin: c.skin,
      level: c.level,
      portrait: (c.portrait && c.portrait.url) || '',
      alignment: (c.alignment && c.alignment.name) || '',
      race: (c.race && c.race.name) || '',
      user: (c.user && c.user.name) || '',
    }))

    return res.json(chars)
  }

  async show(req, res) {
    const char = await Character.findByPk(req.params.id, {
      include: [
        {
          model: Portrait,
          as: 'portrait',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: Divinity,
          as: 'divinity',
          attributes: ['name'],
        },
        {
          model: Alignment,
          as: 'alignment',
          attributes: ['name'],
        },
        {
          model: Race,
          as: 'race',
          attributes: ['name'],
        },
        {
          model: Attribute,
          as: 'attribute',
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
        {
          association: 'classes',
          attributes: ['name'],
          through: { attributes: ['level'] },
        },
        {
          association: 'armor',
          attributes: [
            'name',
            'type',
            'bonus',
            'dexterity',
            'penalty',
            'magic',
            'displacement',
            'weight',
            'special',
            'price',
          ],
          as: 'armor',
        },
        {
          association: 'weapon',
          attributes: [
            'name',
            'dice',
            'multiplier',
            'critical',
            'range',
            'type',
            'material',
            'magic',
            'weight',
            'special',
            'price',
          ],
          as: 'weapon',
        },
      ],
    })

    function getSize(size) {
      let text = ''

      switch (size) {
        case 1:
          text = 'PEQUENO'
          break
        case 2:
          text = 'MÉDIO'
          break
        case 3:
          text = 'GRANDE'
          break
        default:
      }
      return text
    }

    function getGender(gender) {
      let textGender = ''

      switch (gender) {
        case 1:
          textGender = 'MASCULINO'
          break
        case 2:
          textGender = 'FEMININO'
          break

        default:
      }

      return textGender
    }

    function getModifier(mod) {
      let textMod = 0

      if (Number(mod) > 10) {
        textMod = Math.floor((Number(mod) - 10) / 2)
        return textMod
      }

      switch (Number(mod)) {
        case 10:
          textMod = 0
          break
        case 9:
          textMod = -1
          break
        case 8:
          textMod = -1
          break
        case 7:
          textMod = -2
          break
        case 6:
          textMod = -2
          break
        case 5:
          textMod = -3
          break
        case 4:
          textMod = -3
          break
        case 3:
          textMod = -4
          break
        case 2:
          textMod = -4
          break
        case 1:
          textMod = -5
          break
        default:
      }
      return textMod
    }

    const charData = {
      Name: char.name.toUpperCase() || '',
      User: (char.user && char.user.name.toUpperCase()) || '',
      Level: char.level || 0,
      Race: (char.race && char.race.name.toUpperCase()) || '',
      Health: char.health || 0,
      HealthNow: char.health_now || 0,
      Age: char.age || 0,
      Gender: getGender(char.gender || 0),
      Size: getSize(char.size || 0),

      Height: char.height || '',
      Weight: char.weight || '',
      Eye: char.eye.toUpperCase() || '',
      Hair: char.hair.toUpperCase() || '',
      Skin: char.skin.toUpperCase() || '',

      Exp: char.exp || 0,
      Alig: (char.alignment && char.alignment.name.toUpperCase()) || '',
      Divin: (char.divinity && char.divinity.name.toUpperCase()) || '',

      Str: (char.attribute && char.attribute.strength) || 0,
      Des: (char.attribute && char.attribute.dexterity) || 0,
      Con: (char.attribute && char.attribute.contitution) || 0,
      Int: (char.attribute && char.attribute.inteligence) || 0,
      Sab: (char.attribute && char.attribute.wisdom) || 0,
      Car: (char.attribute && char.attribute.charisma) || 0,

      StrMod: getModifier((char.attribute && char.attribute.strength) || 0),
      DesMod: getModifier((char.attribute && char.attribute.dexterity) || 0),
      ConMod: getModifier((char.attribute && char.attribute.contitution) || 0),
      IntMod: getModifier((char.attribute && char.attribute.inteligence) || 0),
      SabMod: getModifier((char.attribute && char.attribute.wisdom) || 0),
      CarMod: getModifier((char.attribute && char.attribute.charisma) || 0),

      Portrait: (char.portrait && char.portrait.url) || '',

      Classes:
        (char &&
          char.classes.map(c => ({
            name: c.name.toUpperCase() || '',
            level: (c.CharacterClass && c.CharacterClass.level) || 0,
          }))) ||
        [],

      Armor: (char && char.armor) || [],
      Weapon: (char && char.weapon) || [],
    }

    return res.json(charData)
  }

  async store(req, res) {
    const person = await Character.create(req.body)

    return res.json(person)
  }
}

export default new CharacterController()
