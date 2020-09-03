import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Switch } from 'antd'

import api from '~/services/api'

import * as Styles from './styles'

export default function MapTool() {
  const profile = useSelector(state => state.user.profile)
  const { handleSubmit, register, setValue } = useForm()
  const [size, setSize] = useState(60)
  const [fogOpacity, setFogOpacity] = useState(60)

  useEffect(() => {
    setValue('owner', profile.id)
    setValue('grid', true)
    setValue('fog', false)
  }, []) //eslint-disable-line

  useEffect(() => {
    register({ name: 'grid' })
    register({ name: 'fog' })
    register({ name: 'owner' })
  }, [register])

  const onSubmit = (data, e) => {
    async function saveData() {
      await api.post('maps', data)
      e.target.reset()
      toast.success('Arma vinculada com sucesso!')
    }
    saveData()
  }

  useEffect(() => {}, [])

  function handleGrid(checked) {
    if (checked === true) {
      setValue('grid', checked)
    } else {
      setValue('grid', false)
    }
  }

  function handleFog(checked) {
    if (checked === true) {
      setValue('fog', checked)
    } else {
      setValue('fog', false)
    }
  }

  return (
    <Styles.Container>
      <h2>Cadastro de Mapas</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Styles.InputContainer>
          <div>
            <label htmlFor="battle">Mapa Batalha</label>
            <Styles.InputLarge
              name="battle"
              ref={register({ required: true })}
            />
          </div>
        </Styles.InputContainer>

        <Styles.InputContainer>
          <div>
            <label htmlFor="world">Mapa Mundo</label>
            <Styles.InputLarge
              name="world"
              ref={register({ required: true })}
            />
          </div>
        </Styles.InputContainer>

        <Styles.InputContainer>
          <div>
            <label htmlFor="grid">Grid</label>
            <div style={{ marginTop: '18px' }}>
              <Switch name="grid" defaultChecked={true} onChange={handleGrid} />
            </div>
          </div>

          <div>
            <label htmlFor="fog">Fog</label>
            <div style={{ marginTop: '18px' }}>
              <Switch name="fog" defaultChecked={false} onChange={handleFog} />
            </div>
          </div>
        </Styles.InputContainer>
        <Styles.InputContainer>
          <div>
            <label htmlFor="size">Borracha</label>
            <input
              value={size}
              onChange={e => {
                setSize(parseInt(e.target.value))
              }}
              type="range"
              step="3"
              min="3"
              max="200"
            />
          </div>

          <div>
            <label htmlFor="size">Fog of War</label>
            <input
              value={fogOpacity}
              onChange={e => {
                setFogOpacity(parseInt(e.target.value))
              }}
              type="range"
              step="10"
              min="1"
              max="100"
            />
          </div>
        </Styles.InputContainer>

        <Styles.ButtonsContainer>
          <Styles.Button type="submit">Cadastrar</Styles.Button>
        </Styles.ButtonsContainer>
      </form>
    </Styles.Container>
  )
}
