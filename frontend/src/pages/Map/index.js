import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import api from '~/services/api'
import RenderMap from '~/components/RenderMap'
import { connect, socket } from '~/services/socket'

import { Container, MapContainer } from './styles'

export default function Map() {
  const [tokens, setTokens] = useState()

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
      <MapContainer>
        <RenderMap tokens={tokens} />
      </MapContainer>
    </Container>
  )
}
