import Monster from '../Models/Monster'
import MonsterAttack from '../models/MonsterAttack'
import MonsterAttributes from '../models/MonsterAttributes'

class MonsterController {
  async index(req, res) {
    const list = await Monster.findAll()

    return res.json(list)
  }

  async show(req, res) {
    const monster = await Monster.findByPk(req.params.id)

    return res.json(monster)
  }

  async store(req, res) {
    const { data, attacks } = req.body

    const newMonster = {
      name: data?.name,
      health: Number(data?.health),
      health_now: Number(data?.health),
      initiative: Number(data?.initiative),
      displacement: Number(data?.displacement),
      ca: Number(data?.ca),
      defense: data?.defense,
      grab: Number(data?.grab),
      challenge: Number(data?.challenge),
      attack_special: data?.attack_special,
      special_qualities: data?.special_qualities,
      fort: Number(data?.fort),
      reflex: Number(data?.reflex),
      will: Number(data?.will),
      skills: data?.skills,
      feats: data?.feats,
      description: data?.description,
      type: data?.type,
      sub_type: data?.subType,
      size: data?.size,
      is_ativo: data?.is_ativo,
    }

    const addMonster = await Monster.create(newMonster)

    const monsterAttrs = {
      monster_id: addMonster.id,
      strength: data?.strength,
      dexterity: data?.dexterity,
      contitution: data?.contitution,
      inteligence: data?.inteligence,
      wisdom: data?.wisdom,
      charisma: data?.charisma,
    }

    await MonsterAttributes.create(monsterAttrs)

    const newAttacks = attacks.map(att => ({
      monster_id: addMonster.id,
      name: att.name,
      dice: Number(att.dice),
      multiplier: Number(att.multiplier),
      critical: Number(att.critical),
      crit_from: Number(att.crit_from),
      range: Number(att.range),
      hit: Number(att.hit),
      damage: Number(att.damage),
    }))

    await MonsterAttack.bulkCreate(newAttacks)

    return res.json({ OK: 'OK' })
  }
}

export default new MonsterController()
