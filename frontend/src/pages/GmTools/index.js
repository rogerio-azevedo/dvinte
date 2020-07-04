import React, { useState } from 'react'
import SelectCharacter from '~/components/SelectCharacter'
import api from '~/services/api'

import * as Styles from './styles'

export default function GmTools() {
  const [character, setCharacter] = useState()

  function handleHealth() {
    api.put(
      '/healthnow',
      { newHealth: 100 },
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

        <Styles.InputHealth />
        <Styles.ButtonHealth onClick={handleHealth}>
          Carregar
        </Styles.ButtonHealth>
      </Styles.HealthContainer>
    </Styles.Container>
  )
}
