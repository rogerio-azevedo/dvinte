import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import api from '~/services/api'

import { charClassRequest } from '~/store/modules/character/actions'

import SelectLevel from '~/components/SelectLevel'
import SelectClasse from '~/components/SelectClasse'

import ButtonPrev from '~/components/ButtonPrev'
import ButtonNext from '~/components/ButtonNext'

import * as Styles from './styles'

export default function CharClass() {
  const classStore = useSelector(
    state => (state.character && state.character.classe) || []
  )

  const dispatch = useDispatch()
  const [level, setLevel] = useState()
  const [classe, setClasse] = useState()
  const [classes, setClasses] = useState(classStore)

  const handleNewClass = newClass => setClasses([...classes, newClass])

  async function handleAdd() {
    const response = await api.get(`classes/${classe}`)

    const newClass = {
      class_id: classe,
      className: response.data && response.data.name.toUpperCase(),
      level,
    }

    handleNewClass(newClass)
    // setClasse()
    // setLevel()
  }

  function handleRemove(item) {
    const newClasses = classes.filter(c => c.className !== item.className)

    setClasses(newClasses)
  }

  function handleSave() {
    dispatch(charClassRequest(classes))
  }

  return (
    <Styles.Container>
      <ButtonPrev linkto="charbase" display="show" />

      <Styles.ContentContainer>
        <h1>Cadastro de Personagem - CLASSE</h1>
        <Styles.FormContainer>
          <div>
            <Styles.InputContainer>
              <div>
                <label htmlFor="character">Classe</label>
                <SelectClasse
                  defaultValue={classe}
                  changeClasse={e => setClasse(e && e.value)}
                />
              </div>
              <div>
                <label htmlFor="character">Level</label>
                <SelectLevel
                  defaultValue={level}
                  changeLevel={e => setLevel(e && e.value)}
                />
              </div>
              <div>
                <Styles.ButtonAdd type="button" onClick={handleAdd}>
                  Adicionar
                </Styles.ButtonAdd>
              </div>
            </Styles.InputContainer>

            <Styles.InputContainer>
              <ul>
                {classes &&
                  classes.map(item => (
                    <li key={Math.random()}>
                      <Styles.ClassInput
                        readOnly
                        defaultValue={item.className}
                      />
                      <Styles.ClassValueInput
                        readOnly
                        defaultValue={item.level}
                      />
                      <FaTimes
                        onClick={() => handleRemove(item)}
                        size={20}
                        color="#8e0e00"
                      />
                    </li>
                  ))}
              </ul>
            </Styles.InputContainer>
          </div>
        </Styles.FormContainer>
        <Styles.DivPage>
          <Link to="charactercreate">
            <Styles.Page />
          </Link>

          <Link to="charbase">
            <Styles.Page />
          </Link>

          <Link to="charclass">
            <Styles.ActivePage />
          </Link>

          <Link to="charattributes">
            <Styles.Page />
          </Link>

          <Link to="charpreview">
            <Styles.Page />
          </Link>
        </Styles.DivPage>
      </Styles.ContentContainer>

      <ButtonNext
        linkto="charattributes"
        display="show"
        handleSave={handleSave}
      />
    </Styles.Container>
  )
}
