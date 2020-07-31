import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import api from '~/services/api'

import { charPreviewRequest } from '~/store/modules/character/actions'

import ButtonPrev from '~/components/ButtonPrev'
import ButtonNext from '~/components/ButtonNext'

import * as Styles from './styles'

export default function CharPreview() {
  const charStore = useSelector(state => state.character || {})

  const [character, setCharacter] = useState()
  const [portrait, setPortrait] = useState()
  const [race, setRace] = useState()
  const [divinity, setDivinity] = useState()
  const [alignment, setAlignment] = useState()

  const dispatch = useDispatch()

  function getGender(id) {
    if (id === 1) {
      return 'MASCULINO'
    }
    return 'FEMININO'
  }

  function getSize(id) {
    if (id === 1) {
      return 'PEQUENO'
    }
    if (id === 2) {
      return 'MEDIO'
    }
    return 'GRANDE'
  }

  useEffect(() => {
    setCharacter({
      name: charStore.base.name,
      age: charStore.base.age,
      gender: charStore.base.gender,
      skin: charStore.base.skin,
      eye: charStore.base.eye,
      hair: charStore.base.hair,
      height: charStore.base.height,
      weight: charStore.base.weight,
      level: charStore.base.level,
      health: 0,
      health_now: 0,
      exp: 0,
      size: charStore.base.size,
      user_id: charStore.base.user_id,
      portrait_id: charStore.portrait,
      alignment_id: charStore.base.alignment,
      race_id: charStore.base.race,
      divinity_id: charStore.base.divinity,
      is_ativo: true,
      classe: charStore.classe,
      attributes: charStore.attributes,
    })

    async function loadPortrait() {
      const response = await api.get(`portraits/${charStore.portrait}`)
      setPortrait(response.data.url)
    }

    loadPortrait()
  }, []) // eslint-disable-line

  useEffect(() => {
    async function loadRace() {
      const response = await api.get(`races/${charStore.base.race}`)
      setRace(response.data.name)
    }

    loadRace()
  }, []) // eslint-disable-line

  useEffect(() => {
    async function loadDivinitie() {
      const response = await api.get(`divinities/${charStore.base.divinity}`)
      setDivinity(response.data.name)
    }

    loadDivinitie()
  }, []) // eslint-disable-line

  useEffect(() => {
    async function loadAlignment() {
      const response = await api.get(`alignments/${charStore.base.alignment}`)
      setAlignment(response.data.name)
    }

    loadAlignment()
  }, []) // eslint-disable-line

  function handleSave() {
    dispatch(charPreviewRequest(character))
  }

  return (
    <Styles.Container>
      <ButtonPrev linkto="charattributes" display="show" />

      <Styles.ContentContainer>
        <h1>Cadastro de Personagem - PREVIEW</h1>
        <Styles.FormContainer>
          <div>
            <Styles.Portrait>
              <img src={portrait} alt="" />
            </Styles.Portrait>

            <Styles.BaseContainer>
              <Styles.LineContaniner>
                <div>
                  <Styles.InputLarge
                    readOnly
                    defaultValue={character && character.name}
                  />
                  <label htmlFor="CharName">Nome do Personagem</label>
                </div>
                <div>
                  <Styles.InputShort
                    readOnly
                    defaultValue={character && character.level}
                  />
                  <label htmlFor="CharAge">Level</label>
                </div>

                <div>
                  <Styles.InputLarge
                    readOnly
                    defaultValue={race && race.toUpperCase()}
                  />
                  <label htmlFor="CharRace">Raça</label>
                </div>
                <div>
                  <Styles.InputLarge
                    readOnly
                    defaultValue={alignment && alignment.toUpperCase()}
                  />
                  <label htmlFor="CharAlignment">Tendência</label>
                </div>
              </Styles.LineContaniner>

              <Styles.LineContaniner>
                <div>
                  <Styles.InputShort
                    readOnly
                    defaultValue={character && character.age}
                  />
                  <label htmlFor="CharAge">Idade</label>
                </div>

                <div>
                  <Styles.InputMed
                    readOnly
                    defaultValue={character && getGender(character.gender)}
                  />
                  <label htmlFor="CharGender">Sexo</label>
                </div>
                <div>
                  <Styles.InputMed
                    readOnly
                    defaultValue={character && getSize(character.size)}
                  />
                  <label htmlFor="CharSize">Tamanho</label>
                </div>
                <div>
                  <Styles.InputLarge
                    readOnly
                    defaultValue={divinity && divinity.toUpperCase()}
                  />
                  <label htmlFor="CharDivinity">Divindade</label>
                </div>
              </Styles.LineContaniner>

              <Styles.LineContaniner>
                <div>
                  <Styles.InputShort
                    defaultValue={character && character.height}
                  />
                  <label htmlFor="CharHeight">Altura</label>
                </div>
                <div>
                  <Styles.InputShort
                    readOnly
                    defaultValue={character && character.weight}
                  />
                  <label htmlFor="CharWeight">Peso</label>
                </div>
                <div>
                  <Styles.InputMed
                    readOnly
                    defaultValue={character && character.eye}
                  />
                  <label htmlFor="CharEye">Olhos</label>
                </div>
                <div>
                  <Styles.InputMed
                    readOnly
                    defaultValue={character && character.hair}
                  />
                  <label htmlFor="CharHair">Cabelos</label>
                </div>
                <div>
                  <Styles.InputMed
                    readOnly
                    defaultValue={character && character.skin}
                  />
                  <label htmlFor="CharSkin">Pele</label>
                </div>
              </Styles.LineContaniner>
            </Styles.BaseContainer>
          </div>
          <Styles.AttrsContainer>
            <Styles.AttributesContainer>
              <Styles.GroupContainer>
                <Styles.AttrsLabel readOnly defaultValue="FOR" />
                <Styles.ValueContainer>
                  <Styles.AttrsValue
                    readOnly
                    value={character?.attributes?.str}
                  />
                </Styles.ValueContainer>
              </Styles.GroupContainer>

              <Styles.GroupContainer>
                <Styles.AttrsLabel readOnly defaultValue="DES" />
                <Styles.ValueContainer>
                  <Styles.AttrsValue
                    readOnly
                    value={character?.attributes?.dex}
                  />
                </Styles.ValueContainer>
              </Styles.GroupContainer>

              <Styles.GroupContainer>
                <Styles.AttrsLabel readOnly defaultValue="CON" />
                <Styles.ValueContainer>
                  <Styles.AttrsValue
                    readOnly
                    value={
                      character &&
                      character.attributes &&
                      character.attributes.con
                    }
                  />
                </Styles.ValueContainer>
              </Styles.GroupContainer>

              <Styles.GroupContainer>
                <Styles.AttrsLabel readOnly defaultValue="INT" />
                <Styles.ValueContainer>
                  <Styles.AttrsValue
                    readOnly
                    value={character?.attributes?.int}
                  />
                </Styles.ValueContainer>
              </Styles.GroupContainer>

              <Styles.GroupContainer>
                <Styles.AttrsLabel readOnly defaultValue="SAB" />
                <Styles.ValueContainer>
                  <Styles.AttrsValue
                    readOnly
                    value={character?.attributes?.wis}
                  />
                </Styles.ValueContainer>
              </Styles.GroupContainer>

              <Styles.GroupContainer>
                <Styles.AttrsLabel readOnly defaultValue="CAR" />
                <Styles.ValueContainer>
                  <Styles.AttrsValue
                    readOnly
                    value={character?.attributes?.cha}
                  />
                </Styles.ValueContainer>
              </Styles.GroupContainer>
            </Styles.AttributesContainer>
            <Styles.ClassContainer>
              <ul>
                {character?.classe?.map(item => (
                  <li key={Math.random()}>
                    <Styles.ClassInput readOnly defaultValue={item.className} />
                    <Styles.ClassValueInput
                      readOnly
                      defaultValue={item.level}
                    />
                  </li>
                ))}
              </ul>
            </Styles.ClassContainer>
          </Styles.AttrsContainer>
        </Styles.FormContainer>

        <Styles.DivPage>
          <Link to="charactercreate">
            <Styles.Page />
          </Link>

          <Link to="charbase">
            <Styles.Page />
          </Link>

          <Link to="charclass">
            <Styles.Page />
          </Link>

          <Link to="charattributes">
            <Styles.Page />
          </Link>

          <Link to="charpreview">
            <Styles.ActivePage />
          </Link>
        </Styles.DivPage>
      </Styles.ContentContainer>

      <ButtonNext linkto="characters" display="show" handleSave={handleSave} />
    </Styles.Container>
  )
}
