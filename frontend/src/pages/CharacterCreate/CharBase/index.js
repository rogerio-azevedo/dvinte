import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { charBaseRequest } from '~/store/modules/character/actions'

import SelectAlignment from '~/components/SelectAlignment'
import SelectDivinity from '~/components/SelectDivinity'
import SelectRace from '~/components/SelectRace'
import SelectLevel from '~/components/SelectLevel'
import SelectGender from '~/components/SelectGender'
import SelectSize from '~/components/SelectSize'

import Button from '~/components/Button'

import ButtonPrev from '~/components/ButtonPrev'
import ButtonNext from '~/components/ButtonNext'

import * as Styles from './styles'

export default function CharBase() {
  const profile = useSelector(state => state.user.profile)
  const userId = profile.id

  const name = useSelector(
    s => s.character && s.character.base && s.character.base.name
  )
  const age = useSelector(
    s => s.character && s.character.base && s.character.base.age
  )
  const height = useSelector(
    s => s.character && s.character.base && s.character.base.height
  )
  const weight = useSelector(
    s => s.character && s.character.base && s.character.base.weight
  )
  const hair = useSelector(
    s => s.character && s.character.base && s.character.base.hair
  )
  const eye = useSelector(
    s => s.character && s.character.base && s.character.base.eye
  )
  const skin = useSelector(
    s => s.character && s.character.base && s.character.base.skin
  )

  const is_ativo = true
  const user_id = userId

  const levelStore = useSelector(
    s => s.character && s.character.base && s.character.base.level
  )
  const sizeStore = useSelector(
    s => s.character && s.character.base && s.character.base.size
  )
  const genderStore = useSelector(
    s => s.character && s.character.base && s.character.base.gender
  )
  const divinityStore = useSelector(
    s => s.character && s.character.base && s.character.base.divinity
  )
  const alignmentStore = useSelector(
    s => s.character && s.character.base && s.character.base.alignment
  )
  const raceStore = useSelector(
    s => s.character && s.character.base && s.character.base.race
  )

  const [level, setLevel] = useState(levelStore)
  const [size, setSize] = useState(sizeStore)
  const [gender, setGender] = useState(genderStore)
  const [divinity, setDivinity] = useState(divinityStore)
  const [alignment, setAlignment] = useState(alignmentStore)
  const [race, setRace] = useState(raceStore)

  const dispatch = useDispatch()

  const { register, handleSubmit, errors, setValue } = useForm({
    defaultValues: {
      name,
      age,
      height,
      weight,
      hair,
      eye,
      skin,
      is_ativo,
      user_id,
      level,
      size,
      gender,
      divinity,
      alignment,
      race,
    },
  })

  useEffect(() => {
    register({ name: 'level' })
    register({ name: 'size' })
    register({ name: 'gender' })
    register({ name: 'divinity' })
    register({ name: 'alignment' })
    register({ name: 'race' })
    register({ name: 'is_ativo' })
    register({ name: 'user_id' })
  }, [register])

  const onSubmit = data => {
    dispatch(charBaseRequest(data))
  }

  function handleLevel(data) {
    setValue('level', data)
    setLevel(data)
  }

  function handleSize(data) {
    setValue('size', data)
    setSize(data)
  }

  function handleGender(data) {
    setValue('gender', data)
    setGender(data)
  }

  function handleDivinity(data) {
    setValue('divinity', data)
    setDivinity(data)
  }

  function handleAlignment(data) {
    setValue('alignment', data)
    setAlignment(data)
  }

  function handleRace(data) {
    setValue('race', data)
    setRace(data)
  }

  return (
    <Styles.Container>
      <ButtonPrev linkto="charactercreate" display="show" />

      <Styles.ContentContainer>
        <h1>Cadastro de Personagem - DADOS BÁSICOS</h1>
        <Styles.FormContainer>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Styles.InputContainer>
              <div>
                <label htmlFor="character">Nome</label>
                <Styles.InputLarge
                  name="name"
                  ref={register({ required: true })}
                  placeholder="Nome"
                />
                {errors.name && errors.name.type === 'required' && (
                  <span>Essa informação é obrigatória</span>
                )}
              </div>

              <div>
                <label htmlFor="character">Idade</label>
                <Styles.InputMed
                  name="age"
                  ref={register({ required: true })}
                  placeholder="Idade"
                />
                {errors.age && errors.age.type === 'required' && (
                  <span>Essa informação é obrigatória</span>
                )}
              </div>

              <div>
                <label htmlFor="character">Altura</label>
                <Styles.InputMed
                  name="height"
                  ref={register({ required: true })}
                  placeholder="Altura"
                />
                {errors.height && errors.height.type === 'required' && (
                  <span>Essa informação é obrigatória</span>
                )}
              </div>

              <div>
                <label htmlFor="character">Peso</label>
                <Styles.InputMed
                  name="weight"
                  ref={register({ required: true })}
                  placeholder="Peso"
                />
                {errors.weight && errors.weight.type === 'required' && (
                  <span>Essa informação é obrigatória</span>
                )}
              </div>
            </Styles.InputContainer>

            <Styles.InputContainer>
              <div>
                <label htmlFor="character">Pele</label>
                <Styles.InputLarge
                  name="skin"
                  ref={register({ required: true })}
                  placeholder="Pele"
                />
                {errors.skin && errors.skin.type === 'required' && (
                  <span>Essa informação é obrigatória</span>
                )}
              </div>
              <div>
                <label htmlFor="character">Olhos</label>
                <Styles.InputLarge
                  name="eye"
                  ref={register({ required: true })}
                  placeholder="Olhos"
                />
                {errors.eye && errors.eye.type === 'required' && (
                  <span>Essa informação é obrigatória</span>
                )}
              </div>
              <div>
                <label htmlFor="character">Cabelos</label>
                <Styles.InputLarge
                  name="hair"
                  ref={register({ required: true })}
                  placeholder="Cabelos"
                />
                {errors.hair && errors.hair.type === 'required' && (
                  <span>Essa informação é obrigatória</span>
                )}
              </div>
            </Styles.InputContainer>

            <Styles.InputContainer>
              <div>
                <label htmlFor="character">Level</label>
                <SelectLevel
                  name="level"
                  defaultValue={level}
                  changeLevel={e => handleLevel(e && e.value)}
                />
              </div>

              <div>
                <label htmlFor="character">Tamanho</label>
                <SelectSize
                  name="size"
                  defaultValue={size}
                  changeSize={e => handleSize(e && e.value)}
                />
              </div>

              <div>
                <label htmlFor="character">Sexo</label>
                <SelectGender
                  name="gender"
                  defaultValue={gender}
                  changeGender={e => handleGender(e && e.value)}
                />
              </div>
            </Styles.InputContainer>

            <Styles.InputContainer>
              <div>
                <label htmlFor="character">Alinhamento</label>
                <SelectAlignment
                  name="alignment"
                  defaultValue={alignment}
                  changeAlignment={e => handleAlignment(e && e.value)}
                />
              </div>

              <div>
                <label htmlFor="character">Raça</label>
                <SelectRace
                  name="race"
                  defaultValue={race}
                  changeRace={e => handleRace(e && e.value)}
                />
              </div>

              <div>
                <label htmlFor="character">Divindade</label>
                <SelectDivinity
                  name="divinity"
                  defaultValue={divinity}
                  changeDivinity={e => handleDivinity(e && e.value)}
                />
              </div>
            </Styles.InputContainer>

            <Styles.InputContainer>
              <Button type="submit" TextButton="Gravar" />
            </Styles.InputContainer>
          </form>
        </Styles.FormContainer>
        <Styles.DivPage>
          <Link to="charactercreate">
            <Styles.Page />
          </Link>

          <Link to="charbase">
            <Styles.ActivePage />
          </Link>

          <Link to="charclass">
            <Styles.Page />
          </Link>

          <Link to="charattributes">
            <Styles.Page />
          </Link>

          <Link to="charpreview">
            <Styles.Page />
          </Link>
        </Styles.DivPage>
      </Styles.ContentContainer>

      <ButtonNext linkto="charclass" display="show" />
    </Styles.Container>
  )
}
