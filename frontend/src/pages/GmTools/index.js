import React, { useState, useEffect, useRef } from 'react'
// import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import { Table } from 'antd'
import api from '~/services/api'

// import SelectCharacter from '~/components/SelectCharacter'
import * as Styles from './styles'

export default function GmTools() {
  // const profile = useSelector(state => state.user.profile)
  const inputRef = useRef()

  // const [character, setCharacter] = useState()
  const [health, setHealth] = useState(0)
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  const [name, setName] = useState('')
  const [attackName, setAttackName] = useState('')
  const [init, setInit] = useState('')
  const [attack, setAttack] = useState('')
  const [crit, setCrit] = useState('')
  const [critMulti, setCritMulti] = useState('')
  const [dice, setDice] = useState('')
  const [multi, setMulti] = useState('')
  const [damage, setDamage] = useState('')

  async function loadChar() {
    setLoading(true)
    const response = await api.get('characters')

    const result = response.data

    setList(result)
    setLoading(false)
  }

  useEffect(() => {
    loadChar()
  }, [health]) // eslint-disable-line

  // async function handleFury() {
  //   await api.put(`attributetemps/${character}`, {
  //     str: 4,
  //     con: 4,
  //   })
  // }

  // async function handleNormal() {
  //   await api.put(`attributetemps/${character}`, {
  //     str: -4,
  //     con: -4,
  //   })
  // }

  // async function handleFatigue() {
  //   await api.put(`attributetemps/${character}`, {
  //     str: -4,
  //     con: -4,
  //   })
  // }

  async function handleHealth(char) {
    await api.put(
      '/healthnow',
      { newHealth: health },
      {
        params: {
          id: char,
        },
      }
    )

    setHealth('')
  }

  // function handleInitGame() {
  //   api.post('combats', {
  //     id: 0,
  //     user_id: profile.id,
  //     user: profile.name,
  //     message: 'Sessão Iniciada',
  //     result: 0,
  //     type: 0,
  //   })
  // }

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
      title: 'Dano/Cura',
      dataIndex: 'pv',
      render: (text, item) => (
        <input
          ref={inputRef}
          onFocus={e => setHealth('')}
          value={health}
          onChange={e => setHealth(e.target.value)}
        />
      ),
    },
    {
      title: 'Salvar',
      dataIndex: 'Salvar',
      render: (text, item) => (
        <button onClick={() => handleHealth(item.id)}>Salvar</button>
      ),
    },
    {
      title: 'Ação',
      dataIndex: 'ver',
      render: (text, item) => <Link to={`/characterview/${item.id}`}>Ver</Link>,
    },
  ]

  async function handleInitiative() {
    const dext = Number(init)

    const dice = Math.floor(Math.random() * 20) + 1

    const initTotal = dext + dice

    const rolled = `Rolou iniciativa d20: ${dice} + ${dext} de destreza, com resultado: ${initTotal}`

    api.post('combats', {
      id: 0,
      user_id: 0,
      user: name,
      message: rolled,
      result: initTotal,
      type: 8,
    })

    api.post('initiatives', {
      user_id: 0,
      user: name,
      initiative: initTotal,
    })
  }

  async function handleAttack() {
    const monsterName = name
    const critFrom = Number(crit) || 20
    const dice = Math.floor(Math.random() * 20) + 1

    let isCrit = ''

    if (dice >= critFrom) {
      isCrit = 'HIT'
    } else if (dice === 1) {
      isCrit = 'FAIL'
    } else {
      isCrit = 'NORMAL'
    }

    const base = Number(attack)
    const attackTotal = Number(base) + Number(dice)

    let rolled = ''

    if (isCrit === 'HIT') {
      rolled = `ACERTO CRÍTICO: ATACOU com ${attackName}: d20: ${dice} + ${base} de base de ataque, com resultado: ${attackTotal}`
    } else if (isCrit === 'FAIL') {
      rolled = `ERRO CRÍTICO: ATACOU com ${attackName}: d20: ${dice} + ${base} de base de ataque, com resultado: ${attackTotal}`
    } else {
      rolled = `ATACOU com ${attackName}: d20: ${dice} + ${base} de base de ataque, com resultado: ${attackTotal}`
    }

    api.post('combats', {
      id: 0,
      user_id: 0,
      user: monsterName,
      message: rolled,
      result: attack,
      type: 3,
      isCrit: isCrit,
    })
  }

  async function handleDamage() {
    const monsterName = name
    const monsterDice = Number(dice)
    const monsterMulti = Number(multi)
    const extraDamage = Number(damage) || 0

    let result = 0
    const random = () => {
      return Math.floor(Math.random() * Number(dice)) + 1
    }

    // eslint-disable-next-line
    for (let i = 0; i < monsterMulti; i++) {
      result += random()
    }

    const totalDamage = Number(result) + Number(extraDamage)

    const rolled = `CAUSOU DANO com ${attackName}: ${monsterMulti} x d${monsterDice}: ${result} + ${extraDamage} de bônus, com resultado: ${totalDamage}.`

    api.post('combats', {
      id: 0,
      user_id: 0,
      user: monsterName,
      message: rolled,
      result: totalDamage,
      type: 4,
    })
  }

  async function handleCritDamage() {
    const monsterName = name
    const monsterDice = Number(dice) || 0
    const monsterMulti = Number(multi) || 0
    const monsterCrit = Number(critMulti) || 0
    const extraDamage = Number(damage) || 0

    let result = 0
    const random = () => {
      return Math.floor(Math.random() * Number(monsterDice)) + 1
    }

    // eslint-disable-next-line
    for (let i = 0; i < monsterMulti; i++) {
      result += random()
    }

    const diceCrit = Number(result) * Number(monsterCrit)
    const damageCrit = Number(extraDamage) * Number(monsterCrit)

    const totalDamage =
      Number(result) * monsterCrit + Number(extraDamage) * monsterCrit

    const rolled = `CAUSOU DANO CRÍTICO com ${attackName}: ${monsterMulti} x d${dice}: ${result} x ${monsterCrit} CRIT: ${diceCrit} + bônus de dano ${extraDamage} x ${monsterCrit}: ${damageCrit}, com resultado: ${totalDamage}.`

    api.post('combats', {
      id: 0,
      user_id: 0,
      user: monsterName,
      message: rolled,
      result: totalDamage,
      type: 4,
      isCrit: 'HIT',
    })
  }

  return (
    <Styles.Container loading={loading ? 1 : 0}>
      <h3>GM Tools</h3>

      <Styles.TableContainer>
        <Table rowKey="id" dataSource={list} columns={columns} />
      </Styles.TableContainer>

      <Styles.MonsterContainer>
        <Styles.BlockContainer>
          <label>Nome</label>
          <Styles.InputMonsterLarge
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Styles.BlockContainer>

        <Styles.BlockContainer>
          <label>Nome Ataque</label>
          <Styles.InputMonsterLarge
            value={attackName}
            onChange={e => setAttackName(e.target.value)}
          />
        </Styles.BlockContainer>
        <Styles.BlockContainer>
          <label>Ataque</label>
          <Styles.InputMonster
            value={attack}
            onChange={e => setAttack(e.target.value)}
          />
        </Styles.BlockContainer>

        <Styles.BlockContainer>
          <label>Critico</label>
          <Styles.InputMonster
            value={crit}
            onChange={e => setCrit(e.target.value)}
          />
        </Styles.BlockContainer>

        <Styles.BlockContainer>
          <label>Critico Multi</label>
          <Styles.InputMonster
            value={critMulti}
            onChange={e => setCritMulti(e.target.value)}
          />
        </Styles.BlockContainer>

        <Styles.BlockContainer>
          <Styles.ButtonMonster onClick={handleAttack}>
            Atacar
          </Styles.ButtonMonster>
        </Styles.BlockContainer>
      </Styles.MonsterContainer>

      <Styles.MonsterContainer>
        <Styles.BlockContainer>
          <label>Multip</label>
          <Styles.InputMonster
            value={multi}
            onChange={e => setMulti(e.target.value)}
          />
        </Styles.BlockContainer>
        <Styles.BlockContainer>
          <label>Dado</label>
          <Styles.InputMonster
            value={dice}
            onChange={e => setDice(e.target.value)}
          />
        </Styles.BlockContainer>

        <Styles.BlockContainer>
          <label>Dano</label>
          <Styles.InputMonster
            value={damage}
            onChange={e => setDamage(e.target.value)}
          />
        </Styles.BlockContainer>

        <Styles.BlockContainer>
          <Styles.ButtonMonster onClick={handleDamage}>
            Dano
          </Styles.ButtonMonster>
        </Styles.BlockContainer>

        <Styles.BlockContainer>
          <Styles.ButtonMonster onClick={handleCritDamage}>
            Dano Crítico
          </Styles.ButtonMonster>
        </Styles.BlockContainer>
      </Styles.MonsterContainer>

      <Styles.MonsterContainer>
        <Styles.BlockContainer>
          <label>Iniciativa</label>
          <Styles.InputMonster
            value={init}
            onChange={e => setInit(e.target.value)}
          />
        </Styles.BlockContainer>

        <Styles.BlockContainer>
          <Styles.ButtonMonster onClick={handleInitiative}>
            Iniciativa
          </Styles.ButtonMonster>
        </Styles.BlockContainer>
      </Styles.MonsterContainer>

      {/* <Styles.CharacterContainer>
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
      </Styles.FuryContainer> */}
    </Styles.Container>
  )
}
