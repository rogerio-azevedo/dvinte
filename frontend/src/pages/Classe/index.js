import React from 'react'

import { Container } from './styles'
import Button from '~/components/Button'

export default function Dashboard() {
  return (
    <Container>
      <h1>Classes</h1>
      <input />
      <Button
        // loading={loading ? 1 : 0}
        // perfil={perfil ? 1 : 0}
        // handleLoadData={handleLoadData}
        TextButton="Gravar"
      />
    </Container>
  )
}
