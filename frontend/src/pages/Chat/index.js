import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import uuid from 'uuid/dist/v4'

import { connect, socket } from '~/services/socket'

import {
  Container,
  ChatContainer,
  List,
  ListMessage,
  Message,
  FormMessage,
  InputMessage,
  DicesRollContainer,
  InputMulti,
  DiceContainer,
  Dice,
  InputResult,
} from './styles'

const from = uuid()

export default function Chat() {
  const profile = useSelector(state => state.user.profile)
  const [message, updateMessage] = useState('')
  const [messages, updateMessages] = useState([])
  const [multiplier, setMultiplier] = useState(1)
  const [result, setResult] = useState()

  useEffect(() => {
    connect()
  }, [])

  useEffect(() => {
    const handleNewMessage = newMessage =>
      updateMessages([...messages, newMessage])
    socket.on('chat.message', handleNewMessage)

    return () => socket.off('chat.message', handleNewMessage)
  }, [messages])

  const handleFormSubmit = event => {
    event.preventDefault()
    if (message.trim()) {
      socket.emit('chat.message', {
        id: from,
        message: `${profile.name} diz: ${message}`,
      })
      updateMessage('')
    }
  }

  const handleInputChange = event => updateMessage(event.target.value)

  function handleCalculateTotal(sides) {
    let calc = 0
    const random = () => {
      return Math.floor(Math.random() * sides) + 1
    }

    // eslint-disable-next-line
    for (let i = 0; i < multiplier; i++) {
      calc += random()
    }

    const rolled = `${profile.name}: rolou ${multiplier}x d${sides} com resultado: ${calc}`

    socket.emit('chat.message', {
      id: from,
      message: rolled,
    })
    setResult(rolled)
  }

  return (
    <Container>
      <ChatContainer>
        <List>
          {messages.map((m, index) => (
            // eslint-disable-next-line
            <ListMessage from={from === m.id ? 1 : 0} key={index}>
              <Message from={from === m.id ? 1 : 0}>{m.message}</Message>
            </ListMessage>
          ))}
        </List>

        <FormMessage onSubmit={handleFormSubmit}>
          <InputMessage
            onChange={handleInputChange}
            placeholder="Mensagem..."
            type="text"
            value={message}
          />
        </FormMessage>
      </ChatContainer>
      <DicesRollContainer>
        <InputMulti
          className="multiplier"
          type="number"
          pattern="[0-9]*"
          min="1"
          max="10"
          placeholder="1"
          onChange={e => setMultiplier(e.target.value)}
        />
        <DiceContainer>
          <Dice
            onClick={() => {
              handleCalculateTotal(4)
            }}
          >
            <strong>d4</strong>
          </Dice>
          <Dice
            onClick={() => {
              handleCalculateTotal(6)
            }}
          >
            <strong>d6</strong>
          </Dice>
          <Dice
            onClick={() => {
              handleCalculateTotal(8)
            }}
          >
            <strong>d8</strong>
          </Dice>
          <Dice
            onClick={() => {
              handleCalculateTotal(10)
            }}
          >
            <strong>d10</strong>
          </Dice>
          <Dice
            onClick={() => {
              handleCalculateTotal(12)
            }}
          >
            <strong>d12</strong>
          </Dice>
          <Dice
            onClick={() => {
              handleCalculateTotal(20)
            }}
          >
            <strong>d20</strong>
          </Dice>
        </DiceContainer>
        <InputResult value={result} />
      </DicesRollContainer>
    </Container>
  )
}
