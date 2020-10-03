import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import api from '~/services/api'

import TokenInput from '~/components/TokenInput'
import { toast } from 'react-toastify'

import { Container, TableContainer, Portrait, MyTable } from './styles'

export default function Token() {
  const { id } = useSelector(state => state.user.profile)

  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    async function loadList() {
      const response = await api.get('tokens')

      setList(response.data)
      setLoading(false)
    }

    loadList()
  }, [])

  async function handleCreateToken(tokenId) {
    const response = await api.get(`combats/${id}`)
    const { data } = response

    const newToken = {
      x: 250,
      y: 250,
      width: 90,
      height: 90,
      rotation: 90,
      character_id: data.Cod,
      token_id: tokenId,
      enabled: enabled,
    }

    await api.post(`chartokens`, newToken)
    toast.success('Token adicionado com sucesso!')
  }

  const columns = [
    {
      title: 'Token',
      dataIndex: 'url',
      render: url => (
        <Portrait>
          <img alt={url} src={url} />
        </Portrait>
      ),
    },
    {
      title: 'Cod',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },

    {
      title: 'Habilitado',
      dataIndex: 'enabled',
      render: (text, item) => (
        <input
          type="checkbox"
          value={enabled}
          onChange={e => setEnabled(e.target.checked)}
        />
      ),
    },
    {
      title: 'Adicionar',
      dataIndex: 'Adicionar',
      render: (text, item) => (
        <button onClick={() => handleCreateToken(item.id)}>Adicionar</button>
      ),
    },
  ]

  return (
    <Container loading={loading ? 1 : 0}>
      <TokenInput style={{ marginTop: '15px' }} />

      <TableContainer>
        <MyTable rowKey="id" dataSource={list} columns={columns} />
      </TableContainer>
    </Container>
  )
}
