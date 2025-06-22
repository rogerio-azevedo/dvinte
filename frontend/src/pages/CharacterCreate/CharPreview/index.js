import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import api from 'services/api'

import { charPreviewRequest } from 'store/modules/character/actions'

import ButtonPrev from 'components/ButtonPrev'
import ButtonNext from 'components/ButtonNext'

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
                  <Styles.InputLarge readOnly value={character?.name} />
                  <label htmlFor="CharName">Nome do Personagem</label>
                </div>
                <div>
                  <Styles.InputShort readOnly value={character?.level} />
                  <label htmlFor="CharAge">Level</label>
                </div>

                <div>
                  <Styles.InputLarge readOnly value={race?.toUpperCase()} />
                  <label htmlFor="CharRace">Raça</label>
                </div>
                <div>
                  <Styles.InputLarge
                    readOnly
                    value={alignment?.toUpperCase()}
                  />
                  <label htmlFor="CharAlignment">Tendência</label>
                </div>
              </Styles.LineContaniner>

              <Styles.LineContaniner>
                <div>
                  <Styles.InputShort readOnly value={character?.age} />
                  <label htmlFor="CharAge">Idade</label>
                </div>

                <div>
                  <Styles.InputMed
                    readOnly
                    value={getGender(character?.gender)}
                  />
                  <label htmlFor="CharGender">Sexo</label>
                </div>
                <div>
                  <Styles.InputMed readOnly value={getSize(character?.size)} />
                  <label htmlFor="CharSize">Tamanho</label>
                </div>
                <div>
                  <Styles.InputLarge readOnly value={divinity?.toUpperCase()} />
                  <label htmlFor="CharDivinity">Divindade</label>
                </div>
              </Styles.LineContaniner>

              <Styles.LineContaniner>
                <div>
                  <Styles.InputShort value={character?.height} />
                  <label htmlFor="CharHeight">Altura</label>
                </div>
                <div>
                  <Styles.InputShort readOnly value={character?.weight} />
                  <label htmlFor="CharWeight">Peso</label>
                </div>
                <div>
                  <Styles.InputMed readOnly value={character?.eye} />
                  <label htmlFor="CharEye">Olhos</label>
                </div>
                <div>
                  <Styles.InputMed readOnly value={character?.hair} />
                  <label htmlFor="CharHair">Cabelos</label>
                </div>
                <div>
                  <Styles.InputMed readOnly value={character?.skin} />
                  <label htmlFor="CharSkin">Pele</label>
                </div>
              </Styles.LineContaniner>
            </Styles.BaseContainer>
          </div>
          <Styles.AttrsContainer>
            <Styles.AttributesContainer>
              <Styles.GroupContainer>
                <Styles.AttrsLabel readOnly value="FOR" />
                <Styles.ValueContainer>
                  <Styles.AttrsValue
                    readOnly
                    value={character?.attributes?.str}
                  />
                </Styles.ValueContainer>
              </Styles.GroupContainer>

              <Styles.GroupContainer>
                <Styles.AttrsLabel readOnly value="DES" />
                <Styles.ValueContainer>
                  <Styles.AttrsValue
                    readOnly
                    value={character?.attributes?.dex}
                  />
                </Styles.ValueContainer>
              </Styles.GroupContainer>

              <Styles.GroupContainer>
                <Styles.AttrsLabel readOnly value="CON" />
                <Styles.ValueContainer>
                  <Styles.AttrsValue
                    readOnly
                    value={character?.attributes?.con}
                  />
                </Styles.ValueContainer>
              </Styles.GroupContainer>

              <Styles.GroupContainer>
                <Styles.AttrsLabel readOnly value="INT" />
                <Styles.ValueContainer>
                  <Styles.AttrsValue
                    readOnly
                    value={character?.attributes?.int}
                  />
                </Styles.ValueContainer>
              </Styles.GroupContainer>

              <Styles.GroupContainer>
                <Styles.AttrsLabel readOnly value="SAB" />
                <Styles.ValueContainer>
                  <Styles.AttrsValue
                    readOnly
                    value={character?.attributes?.wis}
                  />
                </Styles.ValueContainer>
              </Styles.GroupContainer>

              <Styles.GroupContainer>
                <Styles.AttrsLabel readOnly value="CAR" />
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
                    <Styles.ClassInput readOnly value={item.className} />
                    <Styles.ClassValueInput readOnly value={item.level} />
                  </li>
                ))}
              </ul>
            </Styles.ClassContainer>
          </Styles.AttrsContainer>
          <Styles.Button onClick={handleSave}>Gravar</Styles.Button>
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
