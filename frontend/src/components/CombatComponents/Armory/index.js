import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import api from '~/services/api'

import SelectWeapon from '~/components/SelectWeapon'

import * as Styles from './styles'

export default function Armory({ character, weapons, loadChar }) {
  const { profile } = useSelector(state => state.user)
  const from = profile.id

  const [weapon, setWeapon] = useState()

  async function handleAttack() {
    if (weapon) {
      const wep = await character?.Weapon?.find(w => w.id === weapon)
      const extraHit = wep?.hit || 0
      const critFrom =
        wep?.crit_from_mod > 0 ? wep?.crit_from_mod : wep?.crit_from
      const name = wep?.name
      const dice = Math.floor(Math.random() * 20) + 1

      let isCrit = ''

      if (dice >= critFrom) {
        isCrit = 'HIT'
      } else if (dice === 1) {
        isCrit = 'FAIL'
      } else {
        isCrit = 'NORMAL'
      }

      let mod = 0

      const StrMod = character?.StrModTemp
        ? character?.StrModTemp
        : character?.StrMod

      const DexMod = character?.DexModTemp
        ? character?.DexModTemp
        : character?.DexMod

      if (wep?.range > 3) {
        mod = DexMod
      } else {
        mod = StrMod
      }

      const base = character?.BaseAttack + mod
      const attack = Number(base) + Number(dice) + Number(extraHit)

      let rolled = ''

      if (isCrit === 'HIT') {
        rolled = `ACERTO CRÍTICO d20: ${dice} + ${base} de base + ${extraHit} de bônus da arma ${name}, com resultado: ${attack}`
      } else if (isCrit === 'FAIL') {
        rolled = `ERRO CRÍTICO d20: ${dice} + ${base} de base + ${extraHit} de bônus da arma ${name}, com resultado: ${attack}`
      } else {
        rolled = `Rolou ataque d20: ${dice} + ${base} de base + ${extraHit} de bônus da arma ${name}, com resultado: ${attack}`
      }

      api.post('combats', {
        id: from,
        user_id: profile.id,
        user: profile.name,
        message: rolled,
        result: attack,
        type: 3,
        isCrit: isCrit,
      })
    } else {
      toast.error('Escolha por favor uma arma antes de realizar o ataque.')
    }
  }

  async function handleDamage() {
    if (weapon) {
      const wep = await character?.Weapon?.find(w => w.id === weapon)
      const size = await character?.Size

      let mod = 0
      let modType = ''

      if (wep?.dex_damage === true) {
        mod = (await character?.DexModTemp)
          ? character.DexModTemp
          : character.DexMod

        modType = 'de mod de Destreza'
      } else {
        mod = (await character?.StrModTemp)
          ? character.StrModTemp
          : character.StrMod

        modType = 'de mod de Força'
      }

      const exMod = Math.floor(wep?.str_bonus * mod)

      const dice = size === 'MÉDIO' ? wep?.dice_m : wep?.dice_s
      const multi = size === 'MÉDIO' ? wep?.multiplier_m : wep?.multiplier_s
      const name = wep?.name
      const extraDamage = wep?.damage || 0

      const element =
        wep?.element > 0 ? Math.floor(Math.random() * wep?.element) + 1 : 0

      let result = 0
      const random = () => {
        return Math.floor(Math.random() * Number(dice)) + 1
      }

      // eslint-disable-next-line
      for (let i = 0; i < multi; i++) {
        result += random()
      }

      const totalDamage =
        Number(result) + Number(extraDamage) + Number(exMod) + Number(element)

      const rolled = `Rolou dano ${multi} x d${dice}: ${result} + ${exMod} ${modType} + ${extraDamage} de bônus da arma, + ${element} de bônus elemento  com a arma ${name}. Com resultado: ${totalDamage}`

      api.post('combats', {
        id: from,
        user_id: profile.id,
        user: profile.name,
        message: rolled,
        result: totalDamage,
        type: 4,
      })
    } else {
      toast.error('Escolha por favor uma arma antes de realizar o dano.')
    }
  }

  async function handleCritDamage() {
    const wep = await character?.Weapon?.find(w => w.id === weapon)
    const size = await character?.Size
    const critMult = wep?.crit_mod > 0 ? wep?.crit_mod : wep?.critical

    let mod = 0
    let modType = ''

    if (wep?.dex_damage === true) {
      mod = (await character?.DexModTemp)
        ? character.DexModTemp
        : character.DexMod

      modType = 'de mod de Destreza'
    } else {
      mod = (await character?.StrModTemp)
        ? character.StrModTemp
        : character.StrMod

      modType = 'de mod de Força'
    }

    const exMod = Math.floor(wep?.str_bonus * mod) * critMult
    const extraDamage = wep?.damage * critMult || 0
    const name = wep?.name

    const dice = size === 'MÉDIO' ? wep?.dice_m : wep?.dice_s
    const multi =
      size === 'MÉDIO'
        ? wep?.multiplier_m * critMult
        : wep?.multiplier_s * critMult

    const element =
      wep?.element > 0 ? Math.floor(Math.random() * wep?.element) + 1 : 0

    let result = 0
    const random = () => {
      return Math.floor(Math.random() * Number(dice)) + 1
    }

    // eslint-disable-next-line
    for (let i = 0; i < multi; i++) {
      result += random()
    }

    const totalDamage =
      Number(result) + Number(extraDamage) + Number(exMod) + Number(element)

    const rolled = `DANO CRÍTICO ${multi} x d${dice}: ${result} + ${exMod} ${modType} + ${extraDamage} de bônus da arma, + ${element} de bônus elemento  com a arma ${name}. Com resultado: ${totalDamage}`

    if (!weapon) {
      toast.error('Escolha por favor uma arma antes de realizar o dano.')
    } else {
      api.post('combats', {
        id: from,
        user_id: profile.id,
        user: profile.name,
        message: rolled,
        result: totalDamage,
        type: 4,
      })
    }
  }

  return (
    <Styles.Container>
      <h2>Arsenal</h2>
      <Styles.WeaponContainer>
        {!loadChar && (
          <SelectWeapon
            weapons={weapons}
            changeWeapon={e => setWeapon(e?.value)}
          />
        )}
      </Styles.WeaponContainer>
      <Styles.AttackContainer>
        <div>
          <button type="button" onClick={handleAttack}>
            Atacar
          </button>
        </div>
        <div>
          <button type="button" onClick={handleDamage}>
            Dano
          </button>
        </div>
        <div>
          <button type="button" onClick={handleCritDamage}>
            Dano Crítico
          </button>
        </div>
      </Styles.AttackContainer>
    </Styles.Container>
  )
}
