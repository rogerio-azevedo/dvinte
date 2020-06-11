import Character from '../models/Character'
import Portrait from '../models/Portrait'
import Divinity from '../models/Divinity'
import Alignment from '../models/Alignment'
import Race from '../models/Race'
import Attribute from '../models/Attribute'
import AttributeTemp from '../models/AttributeTemp'
import User from '../models/User'
import BaseAttack from '../models/BaseAttack'
import BaseResist from '../models/BaseResist'

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
          model: AttributeTemp,
          as: 'attribute_temp',
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
        {
          association: 'classes',
          attributes: ['name', 'attack', 'fortitude', 'reflex', 'will'],
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

    const levels = char.classes.map(l => l.CharacterClass.level)

    const baseAtack = await BaseAttack.findAll({
      where: { level: levels },
      raw: true,
      attributes: ['level', 'low', 'medium', 'high'],
    })

    const baseResist = await BaseResist.findAll({
      where: { level: levels },
      raw: true,
      attributes: ['level', 'low', 'high'],
    })

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
      Dex: (char.attribute && char.attribute.dexterity) || 0,
      Con: (char.attribute && char.attribute.contitution) || 0,
      Int: (char.attribute && char.attribute.inteligence) || 0,
      Wis: (char.attribute && char.attribute.wisdom) || 0,
      Cha: (char.attribute && char.attribute.charisma) || 0,

      StrMod: getModifier(char.attribute && char.attribute.strength) || 0,
      DexMod: getModifier(char.attribute && char.attribute.dexterity) || 0,
      ConMod: getModifier(char.attribute && char.attribute.contitution) || 0,
      IntMod: getModifier(char.attribute && char.attribute.inteligence) || 0,
      WisMod: getModifier(char.attribute && char.attribute.wisdom) || 0,
      ChaMod: getModifier(char.attribute && char.attribute.charisma) || 0,

      StrTemp: (char.attribute_temp && char.attribute_temp.strength) || 0,
      DexTemp: (char.attribute_temp && char.attribute_temp.dexterity) || 0,
      ConTemp: (char.attribute_temp && char.attribute_temp.contitution) || 0,
      IntTemp: (char.attribute_temp && char.attribute_temp.inteligence) || 0,
      WisTemp: (char.attribute_temp && char.attribute_temp.wisdom) || 0,
      ChaTemp: (char.attribute_temp && char.attribute_temp.charisma) || 0,

      StrModTemp:
        getModifier(char.attribute_temp && char.attribute_temp.strength) || 0,
      DexModTemp:
        getModifier(char.attribute_temp && char.attribute_temp.dexterity) || 0,
      ConModTemp:
        getModifier(char.attribute_temp && char.attribute_temp.contitution) ||
        0,
      IntModTemp:
        getModifier(char.attribute_temp && char.attribute_temp.inteligence) ||
        0,
      WisModTemp:
        getModifier(char.attribute_temp && char.attribute_temp.wisdom) || 0,
      ChaModTemp:
        getModifier(char.attribute_temp && char.attribute_temp.charisma) || 0,

      Portrait: (char.portrait && char.portrait.url) || '',

      BaseAttack:
        char &&
        char.classes.reduce((total, c) => {
          const base = baseAtack.find(a => a.level === c.CharacterClass.level)
          return total + ((base && base[c.attack]) || 0)
        }, 0),

      // BaseAttack:
      //   (char &&
      //     char.classes.map(c =>
      //       baseAtack.find(
      //         a => a.level === (c.CharacterClass && c.CharacterClass.level)
      //       )
      //     )) ||
      //   0,
      // .reduce((acc, val) => {
      //   return acc + val.base_attack
      // }, 0)

      Fortitude:
        char &&
        char.classes.reduce((total, c) => {
          const base = baseResist.find(a => a.level === c.CharacterClass.level)
          return total + ((base && base[c.fortitude]) || 0)
        }, 0),

      Reflex:
        char &&
        char.classes.reduce((total, c) => {
          const base = baseResist.find(a => a.level === c.CharacterClass.level)
          return total + ((base && base[c.reflex]) || 0)
        }, 0),

      Will:
        char &&
        char.classes.reduce((total, c) => {
          const base = baseResist.find(a => a.level === c.CharacterClass.level)
          return total + ((base && base[c.will]) || 0)
        }, 0),

      Classes:
        (char &&
          char.classes.map(c => ({
            name: c.name.toUpperCase() || '',
            attack: c.attack || '',
            fortitude: c.fortitude,
            reflex: c.reflex,
            will: c.will,
            level: (c.CharacterClass && c.CharacterClass.level) || 0,

            // tabela: table,
          }))) ||
        [],

      Armor: (char && char.toJSON().armor) || [],
      Weapon: (char && char.toJSON().weapon) || [],
    }
    return res.json(charData)
  }

  async store(req, res) {
    const person = await Character.create(req.body)

    return res.json(person)
  }
}

export default new CharacterController()
