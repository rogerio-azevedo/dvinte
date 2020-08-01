import CharacterArmor from '../models/CharacterArmor'

class CharacterArmorController {
  async store(req, res) {
    const armorChar = {
      character_id: req.body?.character,
      armor_id: Number(req.body?.armor),
      defense: Number(req.body?.defense),
      description: req.body?.description,
    }
    const armor = await CharacterArmor.create(armorChar)

    return res.json(armor)
  }
}

export default new CharacterArmorController()
