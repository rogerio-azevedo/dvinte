import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import api from '~/services/api'

import {
  Container,
  HeaderContainer,
  Portrait,
  BaseContainer,
  NameContaniner,
  FeatureContainer,
  InputShort,
} from './styles'

export default function CharacterView() {
  const profile = useSelector(state => state.user.profile)

  const [char, setChar] = useState([])
  const [loading, setLoading] = useState(false)

  function getSize(size) {
    let text = ''

    switch (size) {
      case 1:
        text = 'PEQUENO'
        break
      case 2:
        text = 'MÉDIO'
        break
      case 3:
        text = 'GRANDE'
        break
      default:
    }
    return text
  }

  function getGender(gender) {
    let textGender = ''

    switch (gender) {
      case 1:
        textGender = 'MASCULINO'
        break
      case 2:
        textGender = 'FEMININO'
        break

      default:
    }

    return textGender
  }

  async function loadChar() {
    setLoading(true)
    const response = await api.get(`characters/${profile.id}`)

    const result = response.data

    setChar(result)
    setLoading(false)
  }

  useEffect(() => {
    loadChar()
  }, []) // eslint-disable-line

  return (
    <Container loading={loading ? 1 : 0}>
      <h1>Personagem</h1>
      <HeaderContainer>
        <Portrait>
          <img src={char.portrait && char.portrait.url} alt="" />
        </Portrait>

        <BaseContainer>
          <NameContaniner>
            <div>
              <input defaultValue={(char.name || '').toUpperCase()} />
              <label htmlFor="CharName">Nome do Personagem</label>
            </div>

            <div>
              <input defaultValue={(profile.name || '').toUpperCase()} />
              <label htmlFor="CharName">Nome do Jogador</label>
            </div>

            <div>
              <input
                defaultValue={(
                  (char.race && char.race.name) ||
                  ''
                ).toUpperCase()}
              />
              <label htmlFor="CharRace">Raça</label>
            </div>

            <div>
              <InputShort defaultValue={char.level || ''} />
              <label htmlFor="CharLevel">Level</label>
            </div>

            <div>
              <input
                defaultValue={(
                  (char.alignment && char.alignment.name) ||
                  ''
                ).toUpperCase()}
              />
              <label htmlFor="CharAlignment">Tendência</label>
            </div>

            <div>
              <input
                defaultValue={(
                  (char.divinity && char.divinity.name) ||
                  ''
                ).toUpperCase()}
              />
              <label htmlFor="CharDivinity">Divindade</label>
            </div>
          </NameContaniner>

          <FeatureContainer>
            <div>
              <input defaultValue={getSize(char.size) || ''} />
              <label htmlFor="CharSize">Tamanho</label>
            </div>
            <div>
              <InputShort defaultValue={char.age || ''} />
              <label htmlFor="CharAge">Idade</label>
            </div>
            <div>
              <input defaultValue={getGender(char.gender) || ''} />
              <label htmlFor="CharGender">Sexo</label>
            </div>
            <div>
              <InputShort defaultValue={char.height || ''} />
              <label htmlFor="CharHeight">Altura</label>
            </div>
            <div>
              <InputShort defaultValue={char.weight || ''} />
              <label htmlFor="CharWeight">Peso</label>
            </div>
            <div>
              <input defaultValue={(char.eye || '').toUpperCase()} />
              <label htmlFor="CharEye">Olhos</label>
            </div>
            <div>
              <input defaultValue={(char.hair || '').toUpperCase()} />
              <label htmlFor="CharHair">Cabelos</label>
            </div>
            <div>
              <input defaultValue={(char.skin || '').toUpperCase()} />
              <label htmlFor="CharSkin">Pele</label>
            </div>
          </FeatureContainer>
        </BaseContainer>
      </HeaderContainer>
    </Container>
  )
}
