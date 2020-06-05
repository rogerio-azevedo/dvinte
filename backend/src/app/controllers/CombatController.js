import Character from '../models/Character'
import Portrait from '../models/Portrait'
import Race from '../models/Race'
import Attribute from '../models/Attribute'
import AttributeTemp from '../models/AttributeTemp'
import User from '../models/User'

class CombatController {
  async index(req, res) {
    const char = await Character.findOne({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
          where: { id: req.query.user },
        },
        {
          model: Portrait,
          as: 'portrait',
          attributes: ['id', 'path', 'url'],
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

      StrMod: getModifier(char.attribute && char.attribute.strength) || 0,
      DesMod: getModifier(char.attribute && char.attribute.dexterity) || 0,
      ConMod: getModifier(char.attribute && char.attribute.contitution) || 0,
      IntMod: getModifier(char.attribute && char.attribute.inteligence) || 0,
      SabMod: getModifier(char.attribute && char.attribute.wisdom) || 0,
      CarMod: getModifier(char.attribute && char.attribute.charisma) || 0,

      StrTemp: (char.attribute_temp && char.attribute_temp.strength) || 0,
      DesTemp: (char.attribute_temp && char.attribute_temp.dexterity) || 0,
      ConTemp: (char.attribute_temp && char.attribute_temp.contitution) || 0,
      IntTemp: (char.attribute_temp && char.attribute_temp.inteligence) || 0,
      SabTemp: (char.attribute_temp && char.attribute_temp.wisdom) || 0,
      CarTemp: (char.attribute_temp && char.attribute_temp.charisma) || 0,

      StrModTemp:
        getModifier(char.attribute_temp && char.attribute_temp.strength) || 0,
      DesModTemp:
        getModifier(char.attribute_temp && char.attribute_temp.dexterity) || 0,
      ConModTemp:
        getModifier(char.attribute_temp && char.attribute_temp.contitution) ||
        0,
      IntModTemp:
        getModifier(char.attribute_temp && char.attribute_temp.inteligence) ||
        0,
      SabModTemp:
        getModifier(char.attribute_temp && char.attribute_temp.wisdom) || 0,
      CarModTemp:
        getModifier(char.attribute_temp && char.attribute_temp.charisma) || 0,

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
}

export default new CombatController()
