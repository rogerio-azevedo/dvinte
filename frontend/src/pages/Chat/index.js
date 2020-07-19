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
      const response = await api.get('/chats')

      setMessages(response.data)
    } catch (e) {
      toast.error('Conexao com a API mal sucedida.')
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
      toast.error('Conexao com a API mal sucedida.')
    }
  }

  async function getCharacter() {
    setLoadChar(true)
    try {
      const response = await api.get('combats', {
        params: {
          user: profile.id,
        },
      })

      const char = response.data
      setCharacter(char)

      const StrMod = char.StrModTemp ? char.StrModTemp : char.StrMod
      const ConMod = char.ConModTemp ? char.ConModTemp : char.ConMod
      const DexMod = char.DexModTemp ? char.DexModTemp : char.DexMod
      const WisMod = char.WisModTemp ? char.WisModTemp : char.WisMod

      const shield = char.Armor.filter(t => t.type === 2).reduce((acc, val) => {
        return acc + val.bonus
      }, 0)

      const armor = char.Armor.filter(t => t.type === 1).reduce((acc, val) => {
        return acc + val.bonus
      }, 0)

      const maxDext = char.Armor.filter(t => t.type === 1).reduce(
        (acc, val) => {
          return acc + val.dexterity
        },
        0
      )
      setMaxDex(maxDext)

      const charWeapons = char && char.Weapon
      setWeapons(charWeapons)

      const bonusDext = await calcDext(DexMod)
      const ca = 10 + shield + armor + bonusDext

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
      toast.error('Conexao com a API mal sucedida.')
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
      api.post('chats', {
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

    api.post('chats', {
      id: from,
      user_id: profile.id,
      user: profile.name,
      message: rolled,
      result: calc,
      type: 2,
    })
  }

  async function handleAttack() {
    const wep = (await character) && character.Weapon.find(w => w.id === weapon)
    const extraHit = (wep && wep.hit) || 0
    const name = wep && wep.name
    const dice = Math.floor(Math.random() * 20) + 1

    let mod = 0

    const StrMod =
      character && character.StrModTemp
        ? character && character.StrModTemp
        : character && character.StrMod

    const DexMod =
      character && character.DexModTemp
        ? character && character.DexModTemp
        : character && character.DexMod

    if (wep.range > 3) {
      mod = DexMod
    } else {
      mod = StrMod
    }

    const base = (character && character.BaseAttack) + mod
    const attack = Number(base) + Number(dice) + Number(extraHit)

    const rolled = `Rolou ataque d20: ${dice} + ${base} de base + ${extraHit} de bônus da arma ${name}, com resultado: ${attack}`

    if (!weapon) {
      toast.error('Escolha por favor uma arma antes de realizar o ataque.')
    } else {
      api.post('chats', {
        id: from,
        user_id: profile.id,
        user: profile.name,
        message: rolled,
        result: attack,
        type: 3,
      })
    }
  }

  async function handleDamage() {
    const wep = (await character) && character.Weapon.find(w => w.id === weapon)

    const mod =
      (await character) && character.StrModTemp
        ? character.StrModTemp
        : character.StrMod

    const exMod = Math.floor(wep && wep.is_twohand ? mod * 1.5 : mod)

    const dice = wep && wep.dice
    const multi = wep && wep.multiplier
    const name = wep && wep.name
    const extraDamage = (wep && wep.damage) || 0

    let result = 0
    const random = () => {
      return Math.floor(Math.random() * dice) + 1
    }

    // eslint-disable-next-line
    for (let i = 0; i < multi; i++) {
      result += random()
    }

    const totalDamage = Number(result) + Number(extraDamage) + Number(exMod)

    const rolled = `Rolou dano ${multi} x d${dice}: ${result} + ${exMod} + ${extraDamage} de bônus da arma ${name}, com resultado: ${totalDamage}`

    if (!weapon) {
      toast.error('Escolha por favor uma arma antes de realizar o dano.')
    } else {
      api.post('chats', {
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

    api.post('chats', {
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

    api.post('chats', {
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

    api.post('chats', {
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
                  <Styles.Message from={from === m.id ? 1 : 0}>
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
        <Styles.ActionContainer>
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
        <Styles.ActionContainer>
          <Styles.AttackContainer>
            <Styles.WeaponContainer>
              {!loadChar && (
                <SelectWeapon
                  weapons={weapons}
                  changeWeapon={e => setWeapon(e && e.value)}
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
        </Styles.ActionContainer>
      </Styles.TalkContainer>
    </Styles.Container>
  )
}
