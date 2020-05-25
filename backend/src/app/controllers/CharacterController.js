import Character from '../models/Character'
import Portrait from '../models/Portrait'
import Divinity from '../models/Divinity'
import Alignment from '../models/Alignment'
import Race from '../models/Race'
import Attribute from '../models/Attribute'
import User from '../models/User'
import Armor from '../models/Armor'
import Weapon from '../models/Weapon'

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
          model: Armor,
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
          model: Weapon,
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

    const charData = {
      Name: char.name.toUpperCase() || '',
      User: (char.user && char.user.name.toUpperCase()) || '',
      Level: char.level || 0,
      Race: (char.race && char.race.name.toUpperCase()) || '',
      Health: char.health || 0,
      HealthNow: char.health_now || 0,
      Age: char.age || 0,
      Gender: char.gender || 0,
      Size: char.size || 0,

      Height: char.height || '',
      Weight: char.weight || '',
      Eye: char.eye || '',
      Hair: char.hair || '',
      Skin: char.skin || '',

      Exp: char.exp || 0,
      Alig: (char.alignment && char.alignment.name.toUpperCase()) || '',
      Divin: (char.divinity && char.divinity.name.toUpperCase()) || '',

      Str: (char.attribute && char.attribute.strength) || 0,
      Des: (char.attribute && char.attribute.dexterity) || 0,
      Con: (char.attribute && char.attribute.contitution) || 0,
      Int: (char.attribute && char.attribute.inteligence) || 0,
      Sab: (char.attribute && char.attribute.wisdom) || 0,
      Car: (char.attribute && char.attribute.charisma) || 0,

      Portrait: (char.portrait && char.portrait.url) || '',
      Classes: char.classes.map(c => ({
        name: c.name.toUpperCase() || '',
        level: (c.CharacterClass && c.CharacterClass.level) || 0,
      })),

      Armor: char.armor || [],
      Weapon: char.weapon || [],
    }

    return res.json(charData)
  }

  async store(req, res) {
    const person = await Character.create(req.body)

    return res.json(person)
  }
}

export default new CharacterController()
