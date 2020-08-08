import React, { useState } from 'react'
import SelectCharacter from '~/components/SelectCharacter'
import api from '~/services/api'

import * as Styles from './styles'

export default function GmTools() {
  const [character, setCharacter] = useState()
  const [health, setHealth] = useState()
  const [selButton, setSelButton] = useState('normal')

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

  async function getAttributeTemp(char) {
    const response = await api.get(`attributetemps/${char}`)

    console.log(response.data)
  }

  function handleFury() {
    if (!character) {
      getAttributeTemp(character)
      setSelButton('fury')
    }
  }

  function handleNormal() {
    setSelButton('normal')
  }

  function handleFatigue() {
    setSelButton('fatigue')
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
      <h1>Helth Tool</h1>

      <Styles.CharacterContainer>
        <SelectCharacter changeCharacter={e => setCharacter(e && e.value)} />
      </Styles.CharacterContainer>
      <Styles.HealthContainer>
        <Styles.InputHealth
          value={health}
          onChange={e => setHealth(e.target.value)}
        />
        <Styles.ButtonHealth onClick={handleHealth}>
          Carregar
        </Styles.ButtonHealth>
      </Styles.HealthContainer>
      <Styles.FuryContainer>
        <Styles.ButtonFury onClick={handleFury} buttoncolor={selButton}>
          Furia
        </Styles.ButtonFury>
        <Styles.ButtonNormal onClick={handleNormal} buttoncolor={selButton}>
          Normal
        </Styles.ButtonNormal>
        <Styles.ButtonFatigue onClick={handleFatigue} buttoncolor={selButton}>
          Fadiga
        </Styles.ButtonFatigue>
      </Styles.FuryContainer>
    </Styles.Container>
  )
}
