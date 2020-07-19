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
      <Styles.HealthContainer>
        <SelectCharacter changeCharacter={e => setCharacter(e && e.value)} />

        <Styles.InputHealth
          value={health}
          onChange={e => setHealth(e.target.value)}
        />
        <Styles.ButtonHealth onClick={handleHealth}>
          Carregar
        </Styles.ButtonHealth>
      </Styles.HealthContainer>
    </Styles.Container>
  )
}
