import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '~/services/api'
import RenderMap from '~/components/RenderMap'
import { connect, socket } from '~/services/socket'

import { Container, MapContainer } from './styles'

export default function Map() {
  const [tokens, setTokens] = useState()
  const [tool, setTool] = React.useState('Mão')

  async function GetTokens() {
    try {
      const response = await api.get('/chartokens')

      setTokens(response.data)
    } catch (e) {
      toast.error('Conexao com a API mal sucedida.')
    }
  }

  useEffect(() => {
    connect()
    GetTokens()
  }, []) // eslint-disable-line

  useEffect(() => {
    const handleTokens = Tokens => setTokens(Tokens)

    socket.on('token.message', handleTokens)

    return () => socket.off('token.message', handleTokens)
  }, [tokens])

  return (
    <Container>
      <select
        value={tool}
        onChange={e => {
          setTool(e.target.value)
        }}
      >
        <option value="Pincel">Pincel</option>
        <option value="Mão">Mão</option>
      </select>
      <MapContainer>
        <RenderMap tokens={tokens} tool={tool} />
      </MapContainer>
    </Container>
  )
}
