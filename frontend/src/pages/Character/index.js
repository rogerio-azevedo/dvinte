import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import api from '~/services/api'

import Button from '~/components/Button'
import SelectAlignment from '~/components/SelectAlignment'
import SelectClasse from '~/components/SelectClasse'
import SelectDivinity from '~/components/SelectDivinity'
import SelectRace from '~/components/SelectRace'
import SelectLevel from '~/components/SelectLevel'
import SelectGender from '~/components/SelectGender'
import SelectSize from '~/components/SelectSize'

import {
  Container,
  FormContainer,
  ListItens,
  InputContainer,
  InputText,
} from './styles'

export default function Character() {
  const { register, handleSubmit, errors, setValue } = useForm()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    api.get('characters').then(response => {
      setList(response.data)
    })
  }, [])

  useEffect(() => {
    register({ name: 'level' })
    register({ name: 'size' })
    register({ name: 'gender' })
    register({ name: 'classe' })
    register({ name: 'alignment_id' })
    register({ name: 'race_id' })
    register({ name: 'divinity_id' })
    register({ name: 'is_ativo' })
    register({ name: 'user_id' })
    register({ name: 'portrait_id' })
  }, [register])

  const onSubmit = (data, e) => {
    setLoading(false)
    e.target.reset()

    async function saveData() {
      setValue('is_avtivo', 'value', true)
      setValue('user_id', 'value', 1)
      setValue('portrait_id', 'value', 1)

      await api.post('characters', data)

      setLoading(false)
      e.target.reset()
    }
    saveData()
  }

  function handleClasses(c) {
    setValue('is_ativo', true)
    setValue('user_id', 1)
    setValue('portrait_id', 1)

    if (c != null) {
      const classes = c.map(e => ({ classe: e.value }))

      setValue(classes)
    }
  }

  return (
    <Container>
      <h2>Cadastro de Personagens</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContainer>
          <InputContainer>
            <InputText
              name="name"
              ref={register({ required: true })}
              placeholder="Nome"
            />
            {errors.name && errors.name.type === 'required' && (
              <span>Essa informação é obrigatória</span>
            )}

            <InputText
              name="hair"
              ref={register({ required: true })}
              placeholder="Cabelos"
            />
            {errors.hair && errors.hair.type === 'required' && (
              <span>Essa informação é obrigatória</span>
            )}

            <InputText
              name="age"
              ref={register({ required: true })}
              placeholder="Idade"
            />
            {errors.age && errors.age.type === 'required' && (
              <span>Essa informação é obrigatória</span>
            )}

            <InputText
              name="height"
              ref={register({ required: true })}
              placeholder="Altura"
            />
            {errors.height && errors.height.type === 'required' && (
              <span>Essa informação é obrigatória</span>
            )}

            <InputText
              name="weight"
              ref={register({ required: true })}
              placeholder="Peso"
            />
            {errors.weight && errors.weight.type === 'required' && (
              <span>Essa informação é obrigatória</span>
            )}

            <InputText
              name="eye"
              ref={register({ required: true })}
              placeholder="Olhos"
            />
            {errors.eye && errors.eye.type === 'required' && (
              <span>Essa informação é obrigatória</span>
            )}

            <InputText
              name="skin"
              ref={register({ required: true })}
              placeholder="Pele"
            />
            {errors.skin && errors.skin.type === 'required' && (
              <span>Essa informação é obrigatória</span>
            )}
          </InputContainer>

          <SelectLevel
            name="level"
            changeLevel={e => setValue('level', e && e.value)}
          />
          {errors.level && errors.level.type === 'required' && (
            <span>Essa informação é obrigatória</span>
          )}

          <SelectSize
            name="size"
            changeSize={e => setValue('size', e && e.value)}
          />
          {errors.size && errors.size.type === 'required' && (
            <span>Essa informação é obrigatória</span>
          )}

          <SelectGender
            name="gender"
            changeGender={e => setValue('gender', e && e.value)}
          />
          {errors.gender && errors.gender.type === 'required' && (
            <span>Essa informação é obrigatória</span>
          )}

          <SelectClasse name="classe" changeClasse={e => handleClasses(e)} />
          {errors.classe && errors.classe.type === 'required' && (
            <span>Essa informação é obrigatória</span>
          )}

          <SelectAlignment
            name="alignment"
            changeAlignment={e => setValue('alignment_id', e && e.value)}
          />
          {errors.alignment && errors.alignment.type === 'required' && (
            <span>Essa informação é obrigatória</span>
          )}

          <SelectRace
            ref={register}
            name="race"
            changeRace={e => setValue('race_id', e && e.value)}
          />

          {errors.race && errors.race.type === 'required' && (
            <span>Essa informação é obrigatória</span>
          )}

          <SelectDivinity
            name="divinity"
            changeDivinity={e => setValue('divinity_id', e && e.value)}
          />
          {errors.divinity && errors.divinity.type === 'required' && (
            <span>Essa informação é obrigatória</span>
          )}

          <Button loading={loading ? 1 : 0} type="submit" TextButton="Gravar" />
        </FormContainer>
      </form>

      <ListItens>
        <div>
          {list &&
            list.map(item => (
              <ul key={item.id}>
                <li>{item.name.toUpperCase()}</li>
              </ul>
            ))}
        </div>
      </ListItens>
    </Container>
  )
}
