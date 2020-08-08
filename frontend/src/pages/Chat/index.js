import React, { useEffect, useState, createRef } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { format, parseISO } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import api from '~/services/api'

import SelectWeapon from '~/components/SelectWeapon'

import { connect, socket } from '~/services/socket'
import RenderMap from '~/components/RenderMap'
import ModalCharacterStatus from '~/components/ModalCharacterStatus'
import ModalInitiatives from '~/components/ModalInitiatives'
import ModalDamages from '~/components/ModalDamages'

import * as Styles from './styles'

export default function Chat() {
  const profile = useSelector(state => state.user.profile)
  const [loadChar, setLoadChar] = useState()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [multiplier, setMultiplier] = useState(1)
  const [charInit, setCharInit] = useState()
  const [character, setCharacter] = useState()
  const [tokens, setTokens] = useState()
  const [fortitude, setFortitude] = useState()
  const [reflex, setReflex] = useState()
  const [will, setWill] = useState()
  const [maxDex, setMaxDex] = useState()
  const [weapon, setWeapon] = useState()
  const [weapons, setWeapons] = useState()
  const [charStatus, setCharStatus] = useState()

  const from = profile.id
  const messagesEndRef = createRef(null)

  function scrollToBottom() {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  function formatDate(date) {
    const convertedDate = parseISO(date)
    const localDate = utcToZonedTime(convertedDate, 'America/Sao_Paulo')

    return format(localDate, 'dd-MM-yy HH:mm:ss')
  }

  async function loadAllMessages() {
    try {
      const response = await api.get('/combats')
      setMessages(response.data)
    } catch (e) {
      toast.error('Houve um problema ao carregar as mensagens do Chat!')
    }
  }

  async function calcDext(dexMod) {
    let dextBonus = 0

    if (dexMod <= maxDex) {
      dextBonus = dexMod
    } else if (!maxDex || maxDex === 0) {
      dextBonus = dexMod
    } else {
      dextBonus = maxDex
    }

    return dextBonus
  }

  async function GetTokens() {
    try {
      const response = await api.get('/chartokens')

      setTokens(response.data)
    } catch (e) {
      toast.error('Houve um problema ao carregar as Tokens dos Personagens!')
    }
  }

  async function getCharacter() {
    setLoadChar(true)
    try {
      const response = await api.get(`characters/${profile.id}`)

      const char = response.data
      setCharacter(char)

      const StrMod = char.StrModTemp ? char.StrModTemp : char.StrMod
      const ConMod = char.ConModTemp ? char.ConModTemp : char.ConMod
      const DexMod = char.DexModTemp ? char.DexModTemp : char.DexMod
      const WisMod = char.WisModTemp ? char.WisModTemp : char.WisMod

      const shield = char?.Armor.filter(t => t.type === 2).reduce(
        (acc, val) => {
          return acc + (val.bonus + val.defense)
        },
        0
      )

      const armor = char?.Armor.filter(t => t.type === 1).reduce((acc, val) => {
        return acc + (val.bonus + val.defense)
      }, 0)

      const natural = char?.Armor.filter(t => t.type === 3).reduce(
        (acc, val) => {
          return acc + (val.bonus + val.defense)
        },
        0
      )

      const outros = char?.Armor.filter(t => t.type === 5).reduce(
        (acc, val) => {
          return acc + (val.bonus + val.defense)
        },
        0
      )

      const maxDext = char?.Armor.reduce(
        (min, p) => (p?.dexterity < min ? p?.dexterity : min),
        char?.Armor[0]?.dexterity
      )

      setMaxDex(maxDext)

      const charWeapons = char?.Weapon
      setWeapons(charWeapons)

      const bonusDext = await calcDext(DexMod)
      const ca = 10 + shield + armor + bonusDext + natural + outros

      setCharInit(DexMod)
      setFortitude(char.Fortitude + ConMod)
      setReflex(char.Reflex + DexMod)
      setWill(char.Will + WisMod)

      setCharStatus({
        fortitude: char.Fortitude + ConMod,
        reflex: char.Reflex + DexMod,
        will: char.Will + WisMod,
        charInit: DexMod,
        melee: char.BaseAttack + StrMod,
        ranged: char.BaseAttack + DexMod,
        totalCa: ca,
        health: char.Health,
        healthNow: char.HealthNow,
      })

      setLoadChar(false)
    } catch (e) {
      toast.error('Houve um problema ao carregar os dados dos personagens!')
    }
  }

  useEffect(() => {
    scrollToBottom()
  })

  useEffect(() => {
    connect()
    getCharacter()
    GetTokens()
    loadAllMessages()
  }, []) // eslint-disable-line

  useEffect(() => {
    const handleNewMessage = newMessage =>
      setMessages([...messages, newMessage])

    socket.on('chat.message', handleNewMessage)

    return () => socket.off('chat.message', handleNewMessage)
  }, [messages])

  useEffect(() => {
    const handleTokens = Tokens => setTokens(Tokens)

    socket.on('token.message', handleTokens)

    return () => socket.off('token.message', handleTokens)
  }, [tokens])

  const handleFormSubmit = event => {
    event.preventDefault()

    if (message.trim()) {
      api.post('combats', {
        id: from,
        user_id: profile.id,
        user: profile.name,
        message,
        result: 0,
        type: 1,
      })

      setMessage('')
    }
  }

  function handleCalculateTotal(sides) {
    let calc = 0
    const random = () => {
      return Math.floor(Math.random() * sides) + 1
    }

    // eslint-disable-next-line
    for (let i = 0; i < multiplier; i++) {
      calc += random()
    }

    const rolled = `Rolou ${multiplier} x d${sides} com resultado: ${calc}`

    api.post('combats', {
      id: from,
      user_id: profile.id,
      user: profile.name,
      message: rolled,
      result: calc,
      type: 2,
    })
  }

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

      const mod = (await character?.StrModTemp)
        ? character.StrModTemp
        : character.StrMod

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

      const rolled = `Rolou dano ${multi} x d${dice}: ${result} + ${exMod} de mod de força + ${extraDamage} de bônus da arma, + ${element} de bônus elemento  com a arma ${name}. Com resultado: ${totalDamage}`

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
    console.log(wep?.crit_mod)

    const mod = (await character?.StrModTemp)
      ? character.StrModTemp
      : character.StrMod

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

    const rolled = `DANO CRÍTICO ${multi} x d${dice}: ${result} + ${exMod} de mod de força + ${extraDamage} de bônus da arma, + ${element} de bônus elemento  com a arma ${name}. Com resultado: ${totalDamage}`

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

  async function handleFortitude() {
    const dice = Math.floor(Math.random() * 20) + 1

    const fortitudeTest = fortitude + dice

    const rolled = `Rolou teste de Fortitude d20: ${dice} + ${fortitude} de fortitude, com resultado: ${fortitudeTest}`

    api.post('combats', {
      id: from,
      user_id: profile.id,
      user: profile.name,
      message: rolled,
      result: fortitudeTest,
      type: 5,
    })
  }

  async function handleReflex() {
    const dice = Math.floor(Math.random() * 20) + 1

    const reflexTest = reflex + dice

    const rolled = `Rolou teste de Reflexos d20: ${dice} + ${reflex} de reflexos, com resultado: ${reflexTest}`

    api.post('combats', {
      id: from,
      user_id: profile.id,
      user: profile.name,
      message: rolled,
      result: reflexTest,
      type: 6,
    })
  }

  async function handleWill() {
    const dice = Math.floor(Math.random() * 20) + 1

    const willTest = will + dice

    const rolled = `Rolou teste de Vontade d20: ${dice} + ${will} de vontade, com resultado: ${willTest}`

    api.post('combats', {
      id: from,
      user_id: profile.id,
      user: profile.name,
      message: rolled,
      result: willTest,
      type: 7,
    })
  }

  return (
    <Styles.Container>
      <Styles.CombatContainer>
        <Styles.MapContainer>
          <RenderMap tokens={tokens} />
        </Styles.MapContainer>
      </Styles.CombatContainer>

      <Styles.TalkContainer>
        <Styles.ChatContainer>
          <Styles.ChatHistory>
            <ul>
              {messages.map((m, index) => (
                <Styles.ListMessage
                  ref={messagesEndRef}
                  from={from === m.id ? 1 : 0}
                  key={index} // eslint-disable-line
                >
                  <Styles.MessageData from={from === m.id ? 1 : 0}>
                    <Styles.MessageDateTime from={from === m.id ? 1 : 0}>
                      {formatDate(m.date)}
                    </Styles.MessageDateTime>
                    <Styles.MessageDataName from={from === m.id ? 1 : 0}>
                      {m.user}
                    </Styles.MessageDataName>
                  </Styles.MessageData>
                  <Styles.Message crit={m.isCrit} from={from === m.id ? 1 : 0}>
                    {m.message}
                  </Styles.Message>
                </Styles.ListMessage>
              ))}
            </ul>
          </Styles.ChatHistory>

          <Styles.FormMessage onSubmit={handleFormSubmit}>
            <Styles.InputMessage
              onChange={e => setMessage(e.target.value)}
              placeholder="Mensagem..."
              type="text"
              value={message}
            />
          </Styles.FormMessage>
        </Styles.ChatContainer>
        <Styles.DiceContainer>
          <Styles.InputMulti
            className="multiplier"
            type="number"
            pattern="[0-9]*"
            min="1"
            max="10"
            placeholder="1"
            onChange={e => setMultiplier(e.target.value)}
          />
          <Styles.Dice
            onClick={() => {
              handleCalculateTotal(4)
            }}
          >
            <strong>d4</strong>
          </Styles.Dice>
          <Styles.Dice
            onClick={() => {
              handleCalculateTotal(6)
            }}
          >
            <strong>d6</strong>
          </Styles.Dice>
          <Styles.Dice
            onClick={() => {
              handleCalculateTotal(8)
            }}
          >
            <strong>d8</strong>
          </Styles.Dice>
          <Styles.Dice
            onClick={() => {
              handleCalculateTotal(10)
            }}
          >
            <strong>d10</strong>
          </Styles.Dice>
          <Styles.Dice
            onClick={() => {
              handleCalculateTotal(12)
            }}
          >
            <strong>d12</strong>
          </Styles.Dice>
          <Styles.Dice
            onClick={() => {
              handleCalculateTotal(20)
            }}
          >
            <strong>d20</strong>
          </Styles.Dice>
        </Styles.DiceContainer>
        <Styles.ActionContainer>
          <div>
            <div>
              <button type="button" onClick={handleFortitude}>
                Fortitude
              </button>
            </div>
            <div>
              <button type="button" onClick={handleReflex}>
                Reflexos
              </button>
            </div>
            <div>
              <button type="button" onClick={handleWill}>
                Vontade
              </button>
            </div>
          </div>
        </Styles.ActionContainer>
        <Styles.AttackContainer>
          <Styles.WeaponContainer>
            {!loadChar && (
              <SelectWeapon
                weapons={weapons}
                changeWeapon={e => setWeapon(e?.value)}
              />
            )}
          </Styles.WeaponContainer>

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
        </Styles.AttackContainer>
        <Styles.ActionContainer>
          <div>
            <div>
              <button type="button" onClick={handleCritDamage}>
                Crítico
              </button>
            </div>
          </div>

          <div>
            {!loadChar && (
              <ModalInitiatives
                profile={profile}
                from={from}
                charInit={charInit}
              />
            )}
          </div>
          <div>
            {!loadChar && <ModalCharacterStatus charStatus={charStatus} />}
          </div>
          <div>
            <ModalDamages />
          </div>
        </Styles.ActionContainer>
        <Styles.ActionContainer></Styles.ActionContainer>
      </Styles.TalkContainer>
    </Styles.Container>
  )
}
