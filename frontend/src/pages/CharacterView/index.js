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
  AttributesContainer,
  AttrLabel,
} from './styles'

export default function CharacterView() {
  const profile = useSelector(state => state.user.profile)

  const [char, setChar] = useState([])
  const [loading, setLoading] = useState(false)
  const [fullChar, setFullChar] = useState()

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

  function getModifier(mod) {
    let textMod = 0

    if (Number(mod) > 10) {
      textMod = (Number(mod) - 10) / 2
      return textMod
    }

    switch (Number(mod)) {
      case 10:
        textMod = 0
        break
      case 9:
        textMod = -1
        break
      case 8:
        textMod = -1
        break
      case 7:
        textMod = -2
        break
      case 6:
        textMod = -2
        break
      case 5:
        textMod = -3
        break
      case 4:
        textMod = -3
        break
      case 3:
        textMod = -4
        break
      case 2:
        textMod = -4
        break
      case 1:
        textMod = -5
        break
      default:
    }
    return textMod
  }

  async function loadChar() {
    setLoading(true)
    const response = await api.get(`characters/${profile.id}`)

    const result = response.data

    const charData = {
      charPortrait: result.portrait.url || '',
      playerName: result.name.toUpperCase() || '',
      charName: result.name.toUpperCase() || '',
      charLevel: result.level || 0,
      charRace: (result.race && result.race.name.toUpperCase()) || '',
      charAlig: (result.alignment && result.alignment.name.toUpperCase()) || '',
      charDivin: (result.divinity && result.divinity.name.toUpperCase()) || '',

      charStr: (result.attribute && result.attribute.strength) || 0,
      charStrMod: getModifier(result.attribute && result.attribute.strength),
      charDes: (result.attribute && result.attribute.dexterity) || 0,
      charDesMod: getModifier(result.attribute && result.attribute.dexterity),
      charCon: (result.attribute && result.attribute.contitution) || 0,
      charConMod: getModifier(result.attribute && result.attribute.contitution),
      charInt: (result.attribute && result.attribute.inteligence) || 0,
      charIntMod: getModifier(result.attribute && result.attribute.inteligence),
      charSab: (result.attribute && result.attribute.wisdom) || 0,
      charSabMod: getModifier(result.attribute && result.attribute.wisdom),
      charCar: (result.attribute && result.attribute.charisma) || 0,
      charCarMod: getModifier(result.attribute && result.attribute.charisma),
    }

    setChar(result)
    setLoading(false)
    setFullChar(charData)
  }

  useEffect(() => {
    loadChar()
  }, []) // eslint-disable-line

  return (
    <Container loading={loading ? 1 : 0}>
      <h1>Personagem</h1>
      <HeaderContainer>
        <Portrait>
          <img src={fullChar && fullChar.charPortrait} alt="" />
        </Portrait>

        <BaseContainer>
          <NameContaniner>
            <div>
              <input defaultValue={fullChar && fullChar.charName} />
              <label htmlFor="CharName">Nome do Personagem</label>
            </div>

            <div>
              <input defaultValue={fullChar && fullChar.playerName} />
              <label htmlFor="CharName">Nome do Jogador</label>
            </div>

            <div>
              <input defaultValue={fullChar && fullChar.charRace} />
              <label htmlFor="CharRace">Raça</label>
            </div>

            <div>
              <InputShort defaultValue={fullChar && fullChar.charLevel} />
              <label htmlFor="CharLevel">Level</label>
            </div>

            <div>
              <input defaultValue={fullChar && fullChar.charAlig} />
              <label htmlFor="CharAlignment">Tendência</label>
            </div>

            <div>
              <input defaultValue={fullChar && fullChar.charDivin} />
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

      <AttributesContainer>
        <div>
          <AttrLabel defaultValue="FOR" />
          <input defaultValue={fullChar && fullChar.charStr} />
          <input defaultValue={fullChar && fullChar.charStrMod.toFixed(0)} />
        </div>
        <div>
          <AttrLabel defaultValue="DES" />
          <input defaultValue={fullChar && fullChar.charDes} />
          <input defaultValue={fullChar && fullChar.charDesMod.toFixed(0)} />
        </div>
        <div>
          <AttrLabel defaultValue="CON" />
          <input defaultValue={fullChar && fullChar.charCon} />
          <input defaultValue={fullChar && fullChar.charConMod.toFixed(0)} />
        </div>
        <div>
          <AttrLabel defaultValue="INT" />
          <input defaultValue={fullChar && fullChar.charInt} />
          <input defaultValue={fullChar && fullChar.charIntMod.toFixed(0)} />
        </div>
        <div>
          <AttrLabel defaultValue="SAB" />
          <input defaultValue={fullChar && fullChar.charSab} />
          <input defaultValue={fullChar && fullChar.charSabMod.toFixed(0)} />
        </div>

        <div>
          <AttrLabel defaultValue="CAR" />
          <input defaultValue={fullChar && fullChar.charCar} />
          <input defaultValue={fullChar && fullChar.charCarMod.toFixed(0)} />
        </div>
      </AttributesContainer>
    </Container>
  )
}
