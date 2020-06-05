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

  async function getCharacter() {
    setLoading(true)
    try {
      const response = await api.get('combats', {
        params: {
          user: profile.id,
        },
      })

      setCharInit(response.data.DesMod)
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

    const rolled = `Rolou iniciativa ${dice} + ${dext} de destreza, com resultado: ${init}`

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

  return (
    <Styles.Container>
      <Styles.CombatContainer>
        <Styles.MapContainer>
          <RenderMap />
          <Styles.CharContainer>
            <Styles.StatusContainer>
              <div>
                <div>
                  <label htmlFor="inputResist">outros</label>
                  <input defaultValue="" />
                </div>
                <div>
                  <label htmlFor="inputResist">Iniciativa</label>
                  <input defaultValue={charInit} />
                </div>
              </div>
              <div>
                <div>
                  <label htmlFor="inputResist">outros</label>
                  <input defaultValue="" />
                </div>
                <div>
                  <label htmlFor="inputResist">outros</label>
                  <input defaultValue="" />
                </div>
              </div>
              <div>
                <div>
                  <label htmlFor="inputResist">outros</label>
                  <input defaultValue="" />
                </div>
                <div>
                  <label htmlFor="inputResist">outros</label>
                  <input defaultValue="" />
                </div>
              </div>
              <div>
                <div>
                  <label htmlFor="inputResist">outros</label>
                  <input defaultValue="" />
                </div>
                <div>
                  <label htmlFor="inputResist">outros</label>
                  <input defaultValue="" />
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
                  <button type="button" onClick={handleInitiative}>
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
                  <button type="button" onClick={handleInitiative}>
                    Reflexos
                  </button>
                </div>
                <div>
                  <button type="button" onClick={handleInitiative}>
                    Reflexos
                  </button>
                </div>
                <div>
                  <button type="button" onClick={handleInitiative}>
                    Fortitude
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
