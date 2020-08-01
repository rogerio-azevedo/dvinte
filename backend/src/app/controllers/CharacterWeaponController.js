import CharacterWeapon from '../models/CharacterWeapon'

class CharacterWeaponController {
  async store(req, res) {
    const weaponChar = {
      character_id: req.body?.character,
      weapon_id: Number(req.body?.weapon),
      hit: Number(req.body?.hit),
      damage: Number(req.body?.damage),
      element: Number(req.body?.element),
      crit_mod: Number(req.body?.crit_mod),
      crit_from_mod: Number(req.body?.crit_from_mod),
      description: req.body?.description,
    }
    const weapon = await CharacterWeapon.create(weaponChar)

    return res.json(weapon)
  }
}

export default new CharacterWeaponController()
