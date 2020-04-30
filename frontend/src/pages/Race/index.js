import React from 'react'

import api from '~/services/api'

import { Container } from './styles'
import Button from '~/components/Button'
import Input from '~/components/Input'

export default function Dashboard() {
  // const [dataItem, setDataItem] = useState()

  async function handleRace() {
    await api.post('races', {
      name: 'Half Orc',
    })
  }

  return (
    <Container>
      <h1>Raças</h1>
      <Input />
      <Button
        // loading={loading ? 1 : 0}
        // perfil={perfil ? 1 : 0}
        handleRace={handleRace}
        TextButton="Gravar"
      />
    </Container>
  )
}
