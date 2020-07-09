import React, { useState, useEffect } from 'react'
import { Table } from 'antd'

import api from '~/services/api'

import TokenInput from '~/components/TokenInput'

import { Container, TableContainer, Portrait } from './styles'

export default function Token() {
  // const dispatch = useDispatch()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loadList() {
      const response = await api.get('tokens')

      setList(response.data)
      setLoading(false)
    }

    loadList()
  }, [])

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
  ]

  return (
    <Container loading={loading ? 1 : 0}>
      <TokenInput style={{ marginTop: '15px' }} />

      <TableContainer>
        <Table rowKey="id" dataSource={list} columns={columns} />
      </TableContainer>

      {/* <ImageContainer>
        {list.map(item => (
          <List key={item.id}>
            <li>
              <Item>
                <img src={item.url} alt="" />
              </Item>
            </li>
          </List>
        ))}
      </ImageContainer> */}
    </Container>
  )
}
