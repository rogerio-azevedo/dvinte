import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import { Table } from 'antd'
import api from '~/services/api'

import SelectCharacter from '~/components/SelectCharacter'
import * as Styles from './styles'

export default function GmTools() {
  const profile = useSelector(state => state.user.profile)

  const [character, setCharacter] = useState()
  const [health, setHealth] = useState()

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

  async function handleFury() {
    await api.put(`attributetemps/${character}`, {
      str: 4,
      con: 4,
    })
  }

  async function handleNormal() {
    await api.put(`attributetemps/${character}`, {
      str: -4,
      con: -4,
    })
  }

  async function handleFatigue() {
    await api.put(`attributetemps/${character}`, {
      str: -4,
      con: -4,
    })
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

  function handleInitGame() {
    api.post('combats', {
      id: 0,
      user_id: profile.id,
      user: profile.name,
      message: 'Sessão Iniciada',
      result: 0,
      type: 0,
    })
  }

  const columns = [
    {
      title: 'Portrait',
      dataIndex: 'portrait',
      render: portrait => (
        <Styles.Portrait>
          <img alt={portrait} src={portrait} />
        </Styles.Portrait>
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
      title: 'FOR',
      dataIndex: 'armor',
      render: (text, item) => `${item.str}`,
    },
    {
      title: 'CON',
      dataIndex: 'armor',
      render: (text, item) => `${item.con}`,
    },
    {
      title: 'DES',
      dataIndex: 'armor',
      render: (text, item) => `${item.dex}`,
    },
    {
      title: 'INT',
      dataIndex: 'armor',
      render: (text, item) => `${item.int}`,
    },
    {
      title: 'SAB',
      dataIndex: 'armor',
      render: (text, item) => `${item.wis}`,
    },
    {
      title: 'CAR',
      dataIndex: 'armor',
      render: (text, item) => `${item.cha}`,
    },
    {
      title: 'CA',
      dataIndex: 'armor',
      render: (text, item) =>
        `${
          10 +
          item.armor +
          item.shield +
          item.natural +
          item.deflex +
          item.others +
          (item.dexMod <= item.maxDex ? item.dexMod : item.maxDex)
        }`,
    },
    {
      title: 'Melee',
      dataIndex: 'melee',
      render: (text, item) => `${item.baseAttack + item.strMod}`,
    },
    {
      title: 'Range',
      dataIndex: 'range',
      render: (text, item) => `${item.baseAttack + item.dexMod}`,
    },
    {
      title: 'Fortitude',
      dataIndex: 'range',
      render: (text, item) => `${item.fortitude + item.conMod}`,
    },
    {
      title: 'Reflexos',
      dataIndex: 'range',
      render: (text, item) => `${item.reflex + item.dexMod}`,
    },
    {
      title: 'Vontade',
      dataIndex: 'range',
      render: (text, item) => `${item.will + item.wisMod}`,
    },
    {
      title: 'Vida',
      dataIndex: 'health',
      key: 'health',
    },
    {
      title: 'Vida Atual',
      dataIndex: 'health_now',
      key: 'health_now',
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
    <Styles.Container loading={loading ? 1 : 0}>
      <h3>GM Tools</h3>

      <Styles.TableContainer>
        <Table rowKey="id" dataSource={list} columns={columns} />
      </Styles.TableContainer>

      <Styles.CharacterContainer>
        <SelectCharacter changeCharacter={e => setCharacter(e?.value)} />
      </Styles.CharacterContainer>
      <Styles.HealthContainer>
        <Styles.InputHealth
          value={health}
          onChange={e => setHealth(e.target.value)}
        />
        <Styles.Button onClick={handleHealth}>PV Atual</Styles.Button>
      </Styles.HealthContainer>
      <Styles.FuryContainer>
        <Styles.Button onClick={handleFury}>Liga Furia</Styles.Button>
        <Styles.Button onClick={handleNormal}>Desliga Furia</Styles.Button>
        <Styles.Button onClick={handleFatigue}>Liga Fadiga</Styles.Button>
        <Styles.Button onClick={handleFatigue}>Desliga Fadiga</Styles.Button>
      </Styles.FuryContainer>
      <div>
        <Styles.Button onClick={handleInitGame}>Iniciar Sessão</Styles.Button>
        {/* <Styles.Button onClick={handleNormal}>Desliga Furia</Styles.Button> */}
      </div>
    </Styles.Container>
  )
}
