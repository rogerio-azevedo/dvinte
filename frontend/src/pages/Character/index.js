import React, { useState, useEffect } from 'react'
// import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import api from '~/services/api'

import { Container, TableContainer, Portrait, MyTable } from './styles'

export default function CharacterList() {
  // const profile = useSelector(state => state.user.profile)

  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  async function loadChar() {
    setLoading(true)
    const response = await api.get('characters')

    const result = response.data

    setList(result)
    setLoading(false)
  }

  useEffect(() => {
    loadChar()
  }, []) // eslint-disable-line

  const columns = [
    {
      title: 'Portrait',
      dataIndex: 'portrait',
      render: portrait => (
        <Portrait>
          <img alt={portrait} src={portrait} />
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
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: 'Raça',
      dataIndex: 'race',
      key: 'race',
    },
    {
      title: 'Tendência',
      dataIndex: 'alignment',
      key: 'alignment',
    },
    {
      title: 'Vida',
      dataIndex: 'health',
      key: 'health',
    },
    {
      title: 'XP',
      dataIndex: 'exp',
      key: 'exp',
    },
    {
      title: 'Pele',
      dataIndex: 'skin',
      key: 'skin',
    },
    {
      title: 'Jogador',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Ação',
      dataIndex: 'ver',
      render: (text, item) => <Link to={`/characterview/${item.id}`}>Ver</Link>,
    },
  ]

  return (
    <Container loading={loading ? 0 : 1}>
      <TableContainer>
        <MyTable rowKey="id" dataSource={list} columns={columns} />
      </TableContainer>
    </Container>
  )
}
