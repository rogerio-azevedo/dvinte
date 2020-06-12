import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { format, parseISO } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import api from '~/services/api'

import { connect, socket } from '~/services/socket'
import RenderMap from '~/components/RenderMap'

import * as Styles from './styles'

export default function Chat() {
  const profile = useSelector(state => state.user.profile)
  const [loading, setLoading] = useState()
  const [message, setMessage] = useState('')
  const [messages, updateMessages] = useState([])
  const [multiplier, setMultiplier] = useState(1)
  const [charInit, setCharInit] = useState()
  // const [character, setCharacter] = useState()

  const [hit, setHit] = useState()
  const [fortitude, setFortitude] = useState()
  const [reflex, setReflex] = useState()
  const [will, setWill] = useState()

  const [maxDex, setMaxDex] = useState()
  const [totalCa, setTotalCa] = useState()

  const [health, setHealth] = useState()
  const [healthNow, setHealthNow] = useState()

  const [initBoard, setInitBoard] = useState([])
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

      updateMessages(response.data)
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

  async function getCharacter() {
    setLoading(true)
    try {
      const response = await api.get('combats', {
        params: {
          user: profile.id,
        },
      })

      const char = response.data

      const SrtMod = char.StrModTemp ? char.StrModTemp : char.StrMod
      const ConMod = char.ConModTemp ? char.ConModTemp : char.ConMod
      const DexMod = char.DexModTemp ? char.DexModTemp : char.DexMod
      const WisMod = char.WisModTemp ? char.WisModTemp : char.WisMod

      // const IntMod = char.IntModTemp ? char.IntModTemp : char.IntMod
      // const ChaMod = char.ChaModTemp ? char.ChaModTemp : char.ChaMod

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

      const bonusDext = await calcDext(DexMod)
      const ca = 10 + shield + armor + bonusDext

      setHealth(char.Health)
      setHealthNow(char.HealthNow)
      setTotalCa(ca)
      setHit(SrtMod + char.BaseAttack)
      setFortitude(char.Fortitude + ConMod)
      setReflex(char.Reflex + DexMod)
      setWill(char.Will + WisMod)

      setLoading(false)
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
    loadAllMessages()
  }, []) // eslint-disable-line

  useEffect(() => {
    const handleNewMessage = newMessage =>
      updateMessages([...messages, newMessage])
    socket.on('chat.message', handleNewMessage)

    return () => socket.off('chat.message', handleNewMessage)
  }, [messages])

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
    const dext = !loading && charInit

    const dice = Math.floor(Math.random() * 20) + 1

    const init = dext + dice

    const rolled = `Rolou iniciativa d20: ${dice} + ${dext} de destreza, com resultado: ${init}`

    setInitBoard([
      ...initBoard,
      {
        user: profile.name,
        init: dext + dice,
      },
    ])

    api.post('chats', {
      id: from,
      user_id: profile.id,
      user: profile.name,
      message: rolled,
    })
  }

  async function handleAttack() {
    const acerto = !loading && hit

    const dice = Math.floor(Math.random() * 20) + 1

    const attack = acerto + dice

    const rolled = `Rolou ataque d20: ${dice} + ${acerto} de base de ataque, com resultado: ${attack}`

    api.post('chats', {
      id: from,
      user_id: profile.id,
      user: profile.name,
      message: rolled,
    })
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

    const rolled = `Rolou teste de Vontade d20: ${dice} + ${will} de reflexos, com resultado: ${willTest}`

    api.post('chats', {
      id: from,
      user_id: profile.id,
      user: profile.name,
      message: rolled,
    })
  }

  return (
    <Styles.Container>
      <Styles.CombatContainer>
        <Styles.MapContainer>
          <RenderMap />
          <Styles.CharContainer>
            <Styles.StatusContainer>
              <div>
                <div>
                  <label htmlFor="inputResist">Fortitude</label>
                  <input defaultValue={fortitude} />
                </div>
                <div>
                  <label htmlFor="inputResist">Reflexos</label>
                  <input defaultValue={reflex} />
                </div>
                <div>
                  <label htmlFor="inputResist">Vontade</label>
                  <input defaultValue={will} />
                </div>
                <div>
                  <label htmlFor="inputResist">Iniciativa</label>
                  <input defaultValue={charInit} />
                </div>
              </div>
              <div />
              <div>
                <div>
                  <label htmlFor="inputResist">CA</label>
                  <input defaultValue={totalCa} />
                </div>
                <div>
                  <label htmlFor="inputResist">Acerto</label>
                  <input defaultValue={hit} />
                </div>
                <div>
                  <label htmlFor="inputResist">PV</label>
                  <input defaultValue={health} />
                </div>
                <div>
                  <label htmlFor="inputResist">PV Atual</label>
                  <input defaultValue={healthNow} />
                </div>
              </div>
            </Styles.StatusContainer>
            <Styles.ActionContainer>
              <div>
                <div>
                  <button type="button" onClick={handleInitiative}>
                    Iniciativa
                  </button>
                </div>
                <div>
                  <button type="button" onClick={handleAttack}>
                    Atacar
                  </button>
                </div>
                <div>
                  <button type="button" onClick={handleInitiative}>
                    Dano
                  </button>
                </div>
              </div>
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
          </Styles.CharContainer>
        </Styles.MapContainer>
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
        </Styles.TalkContainer>
      </Styles.CombatContainer>

      {/* <Styles.DicesRollContainer /> */}
      {/* <Styles.InitContainer>
        <div>
          <input defaultValue={charInit} />

          <button type="button" onClick={handleInitiative}>
            Iniciativa
          </button>
        </div>
        <Styles.InitBoardContainer>
          <ul>
            {initBoard
              .sort((a, b) => a.init - b.init)
              .map(item => (
                <li key={Math.random()}>
                  <input defaultValue={item.user} />
                  <input defaultValue={item.init} />
                </li>
              ))}
          </ul>
        </Styles.InitBoardContainer>
      </Styles.InitContainer> */}
    </Styles.Container>
  )
}
