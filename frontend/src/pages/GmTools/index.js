import React, { useState } from 'react'
import SelectCharacter from '~/components/SelectCharacter'
import api from '~/services/api'

import * as Styles from './styles'

export default function GmTools() {
  const [character, setCharacter] = useState()
  const [health, setHealth] = useState()

  // function useInput({ type /* ... */ }) {
  //   const input = (
  //     <input
  //       value={value}
  //       onChange={e => setValue(e.target.value)}
  //       type={type}
  //     />
  //   )
  //   return [value, input]
  // }

  // async function setFury(char) {
  //   console.log(char)
  //   const response = await api.put(`attributetemps/${character}`, {
  //     str
  //   })
  // }

  async function handleFury() {
    await api.put(`attributetemps/${character}`, {
      str: 4,
      con: 4,
    })
  }

  async function handleNormal() {
    await api.put(`attributetemps/${character}`, {
      str: -4,
      con: -4,
    })
  }

  async function handleFatigue() {
    await api.put(`attributetemps/${character}`, {
      str: -4,
      con: -4,
    })
  }

  function handleHealth() {
    api.put(
      '/healthnow',
      { newHealth: health },
      {
        params: {
          id: character,
        },
      }
    )
  }

  return (
    <Styles.Container>
      <h1>GM Tools</h1>

      <Styles.CharacterContainer>
        <SelectCharacter changeCharacter={e => setCharacter(e?.value)} />
      </Styles.CharacterContainer>
      <Styles.HealthContainer>
        <Styles.InputHealth
          value={health}
          onChange={e => setHealth(e.target.value)}
        />
        <Styles.Button onClick={handleHealth}>PV Atual</Styles.Button>
      </Styles.HealthContainer>
      <Styles.FuryContainer>
        <Styles.Button onClick={handleFury}>Liga Furia</Styles.Button>
        <Styles.Button onClick={handleNormal}>Desliga Furia</Styles.Button>
        <Styles.Button onClick={handleFatigue}>Liga Fadiga</Styles.Button>
        <Styles.Button onClick={handleFatigue}>Desliga Fadiga</Styles.Button>
      </Styles.FuryContainer>
    </Styles.Container>
  )
}
