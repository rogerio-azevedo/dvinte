import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { format, parseISO } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import api from '~/services/api'

import SelectWeapon from '~/components/SelectWeapon'

import { connect, socket } from '~/services/socket'

import * as Styles from './styles'

export default function Combat() {
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
  const [melee, setMelee] = useState()
  const [ranged, setRanged] = useState()
  const [maxDex, setMaxDex] = useState()
  const [totalCa, setTotalCa] = useState()
  const [health, setHealth] = useState()
  const [healthNow, setHealthNow] = useState()
  const [weapon, setWeapon] = useState()
  const [weapons, setWeapons] = useState()
  const [initiatives, setInitiatives] = useState([])
  const [tool, setTool] = React.useState('Mão')

  const from = profile.id
  const messagesEndRef = React.createRef(null)

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

      setCharInit(DexMod)

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

      setMelee(char.BaseAttack + StrMod)
      setRanged(char.BaseAttack + DexMod)
      setHealth(char.Health)
      setHealthNow(char.HealthNow)
      setTotalCa(ca)
      setFortitude(char.Fortitude + ConMod)
      setReflex(char.Reflex + DexMod)
      setWill(char.Will + WisMod)

      setLoadChar(false)
    } catch (e) {
      toast.error('Conexao com a API mal sucedida.')
    }
  }

  async function loadInitiative() {
    try {
      const response = await api.get('/initiatives')

      setInitiatives(response.data)
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
    loadInitiative()
  }, []) // eslint-disable-line

  useEffect(() => {
    const handleNewMessage = newMessage =>
      setMessages([...messages, newMessage])

    socket.on('chat.message', handleNewMessage)

    return () => socket.off('chat.message', handleNewMessage)
  }, [messages])

  useEffect(() => {
    const handleNewInit = newInitiative =>
      setInitiatives([...initiatives, newInitiative])

    socket.on('init.message', handleNewInit)

    return () => socket.off('init.message', handleNewInit)
  }, [initiatives])

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
    })
  }

  async function handleInitiative() {
    const dext = !loadChar && charInit

    const dice = Math.floor(Math.random() * 20) + 1

    const init = dext + dice

    const rolled = `Rolou iniciativa d20: ${dice} + ${dext} de destreza, com resultado: ${init}`

    api.post('chats', {
      id: from,
      user_id: profile.id,
      user: profile.name,
      message: rolled,
    })

    api.post('initiatives', {
      user_id: profile.id,
      user: profile.name,
      initiative: init,
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
      })
    }
  }

  async function handleDamage() {
    const wep = (await character) && character.Weapon.find(w => w.id === weapon)

    const mod =
      (await character) && character.StrModTemp
        ? character.StrModTemp
        : character.StrMod
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

    const totalDamage = Number(result) + Number(extraDamage) + Number(mod)

    const rolled = `Rolou dano ${multi} x d${dice}: ${result} + ${mod} + ${extraDamage} de bônus da arma ${name}, com resultado: ${totalDamage}`

    if (!weapon) {
      toast.error('Escolha por favor uma arma antes de realizar o dano.')
    } else {
      api.post('chats', {
        id: from,
        user_id: profile.id,
        user: profile.name,
        message: rolled,
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
    })
  }

  return (
    <Styles.Container>
      <Styles.TalkContainer>
        <Styles.ChatContainer>
          <Styles.ChatHistory>
            <Styles.List>
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
            </Styles.List>
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
              <button type="button" onClick={handleInitiative}>
                Iniciativa
              </button>
            </div>
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
      </Styles.TalkContainer>
      <Styles.CharContainer>
        <Styles.StatusContainer>
          <Styles.GroupStatus>
            <Styles.Resume>
              <label htmlFor="inputResist">Fortitude</label>
              <Styles.InputResume readOnly defaultValue={fortitude} />
            </Styles.Resume>
            <Styles.Resume>
              <label htmlFor="inputResist">Reflexos</label>
              <Styles.InputResume readOnly defaultValue={reflex} />
            </Styles.Resume>
            <Styles.Resume>
              <label htmlFor="inputResist">Vontade</label>
              <Styles.InputResume readOnly defaultValue={will} />
            </Styles.Resume>
            <Styles.Resume>
              <label htmlFor="inputResist">Iniciativa</label>
              <Styles.InputResume readOnly defaultValue={charInit} />
            </Styles.Resume>
          </Styles.GroupStatus>

          <Styles.GroupStatus>
            <Styles.Resume>
              <label htmlFor="inputResist">CA</label>
              <Styles.InputResume readOnly defaultValue={totalCa} />
            </Styles.Resume>
            <Styles.Resume>
              <label htmlFor="inputResist">Melee</label>
              <Styles.InputResume readOnly defaultValue={melee} />
            </Styles.Resume>
            <Styles.Resume>
              <label htmlFor="inputResist">Ranged</label>
              <Styles.InputResume readOnly defaultValue={ranged} />
            </Styles.Resume>
            <Styles.Resume>
              <label htmlFor="inputResist">PV</label>
              <Styles.InputResume readOnly defaultValue={health} />
            </Styles.Resume>
            <Styles.Resume>
              <label htmlFor="inputResist">PV Atual</label>
              <Styles.InputResume readOnly defaultValue={healthNow} />
            </Styles.Resume>
          </Styles.GroupStatus>
        </Styles.StatusContainer>
        <Styles.InitContainer>
          <Styles.InitBoardContainer>
            <h3>Iniciativa</h3>

            <ul>
              {initiatives
                .sort((a, b) => b.initiative - a.initiative)
                .map(item => (
                  <li key={Math.random()}>
                    <Styles.InitUser readOnly defaultValue={item.user} />
                    <Styles.InitValue readOnly defaultValue={item.initiative} />
                  </li>
                ))}
            </ul>
          </Styles.InitBoardContainer>
        </Styles.InitContainer>
        <Styles.AttackContainer>
          <Styles.WeaponContainer>
            <div>
              {!loadChar && (
                <SelectWeapon
                  weapons={weapons}
                  changeWeapon={e => setWeapon(e && e.value)}
                />
              )}
            </div>
          </Styles.WeaponContainer>
          <select
            value={tool}
            onChange={e => {
              setTool(e.target.value)
            }}
          >
            <option value="Pincel">Pincel</option>
            <option value="Mão">Mão</option>
          </select>
          <div>
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
          </div>

          <div />
        </Styles.AttackContainer>
      </Styles.CharContainer>
    </Styles.Container>
  )
}
