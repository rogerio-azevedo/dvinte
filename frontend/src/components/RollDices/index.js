import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Container,
  InputMulti,
  DiceContainer,
  Dice,
  InputResult,
} from './styles'

export default function RollDices() {
  const profile = useSelector(state => state.user.profile)
  const [multiplier, setMultiplier] = useState(1)
  const [result, setResult] = useState()

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

    setResult(rolled)
  }

  return (
    <Container>
      <h1>Rolagem de Dados</h1>

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
    </Container>
  )
}
