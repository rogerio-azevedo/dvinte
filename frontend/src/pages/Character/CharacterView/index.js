import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import api from '~/services/api'

import {
  Container,
  HeaderContainer,
  Portrait,
  BaseContainer,
  LineContaniner,
  InputShort,
  InputMed,
  InputLarge,
  StatsContainer,
  AttributesContainer,
  AttrLabel,
  AttrLabel1,
  HealthClassContainer,
  HealthContainer,
  ClassContainer,
  ClassInput,
  ClassValueInput,
  ResistContainer,
  MainResistContainer,
  DefenseContainer,
  LabelContainer,
  ResistMainLabel,
  DefenseMainLabel,
  ResistLabel,
  InputResitContainer,
  InputResit,
  InputDefense,
} from './styles'

export default function CharacterView() {
  const profile = useSelector(state => state.user.profile)

  const { id } = useParams()

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
      textMod = Math.floor((Number(mod) - 10) / 2)
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

    const response = await api.get(`characters/${id}`)

    const result = response.data

    const charData = {
      charPortrait: (result.portrait && result.portrait.url) || '',
      playerName: profile.name.toUpperCase() || '',
      charName: result.name.toUpperCase() || '',
      charLevel: result.level || 0,
      charRace: (result.race && result.race.name.toUpperCase()) || '',
      charHealth: result.health || 0,
      charExp: result.exp || 0,
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
      <HeaderContainer>
        <legend>Dados Básicos</legend>
        <div>
          <Portrait>
            <img src={fullChar && fullChar.charPortrait} alt="" />
          </Portrait>

          <BaseContainer>
            <LineContaniner>
              <div>
                <InputLarge defaultValue={fullChar && fullChar.charName} />
                <label htmlFor="CharName">Nome do Personagem</label>
              </div>

              <div>
                <InputLarge defaultValue={fullChar && fullChar.playerName} />
                <label htmlFor="CharName">Nome do Jogador</label>
              </div>

              <div>
                <InputLarge defaultValue={fullChar && fullChar.charRace} />
                <label htmlFor="CharRace">Raça</label>
              </div>
              <div>
                <InputLarge defaultValue={fullChar && fullChar.charAlig} />
                <label htmlFor="CharAlignment">Tendência</label>
              </div>
            </LineContaniner>

            <LineContaniner>
              <div>
                <InputShort defaultValue={char.age || ''} />
                <label htmlFor="CharAge">Idade</label>
              </div>

              <div>
                <InputMed defaultValue={getGender(char.gender) || ''} />
                <label htmlFor="CharGender">Sexo</label>
              </div>
              <div>
                <InputMed defaultValue={getSize(char.size) || ''} />
                <label htmlFor="CharSize">Tamanho</label>
              </div>
              <div>
                <InputLarge defaultValue={fullChar && fullChar.charDivin} />
                <label htmlFor="CharDivinity">Divindade</label>
              </div>
            </LineContaniner>

            <LineContaniner>
              <div>
                <InputShort defaultValue={char.height || ''} />
                <label htmlFor="CharHeight">Altura</label>
              </div>
              <div>
                <InputShort defaultValue={char.weight || ''} />
                <label htmlFor="CharWeight">Peso</label>
              </div>
              <div>
                <InputMed defaultValue={(char.eye || '').toUpperCase()} />
                <label htmlFor="CharEye">Olhos</label>
              </div>
              <div>
                <InputMed defaultValue={(char.hair || '').toUpperCase()} />
                <label htmlFor="CharHair">Cabelos</label>
              </div>
              <div>
                <InputMed defaultValue={(char.skin || '').toUpperCase()} />
                <label htmlFor="CharSkin">Pele</label>
              </div>
            </LineContaniner>
          </BaseContainer>
        </div>
      </HeaderContainer>

      <StatsContainer>
        <AttributesContainer>
          <legend>Atributos</legend>
          <div>
            <AttrLabel1 defaultValue="FOR" />
            <div>
              <label htmlFor="inputResist">valor</label>
              <input defaultValue={fullChar && fullChar.charStr} />
            </div>
            <div>
              <label htmlFor="inputResist">mod</label>
              <input defaultValue={fullChar && fullChar.charStrMod} />
            </div>
            <div>
              <label htmlFor="inputResist">v.temp</label>
              <input defaultValue="" />
            </div>
            <div>
              <label htmlFor="inputResist">m.temp</label>
              <input defaultValue="" />
            </div>
          </div>

          <div>
            <AttrLabel defaultValue="DES" />
            <div>
              <input defaultValue={fullChar && fullChar.charDes} />
            </div>
            <div>
              <input defaultValue={fullChar && fullChar.charDesMod} />
            </div>
            <div>
              <input defaultValue="" />
            </div>
            <div>
              <input defaultValue="" />
            </div>
          </div>

          <div>
            <AttrLabel defaultValue="CON" />
            <div>
              <input defaultValue={fullChar && fullChar.charCon} />
            </div>
            <div>
              <input defaultValue={fullChar && fullChar.charConMod} />
            </div>
            <div>
              <input defaultValue="" />
            </div>
            <div>
              <input defaultValue="" />
            </div>
          </div>

          <div>
            <AttrLabel defaultValue="INT" />
            <div>
              <input defaultValue={fullChar && fullChar.charInt} />
            </div>
            <div>
              <input defaultValue={fullChar && fullChar.charIntMod} />
            </div>
            <div>
              <input defaultValue="" />
            </div>
            <div>
              <input defaultValue="" />
            </div>
          </div>

          <div>
            <AttrLabel defaultValue="SAB" />
            <div>
              <input defaultValue={fullChar && fullChar.charSab} />
            </div>
            <div>
              <input defaultValue={fullChar && fullChar.charSabMod} />
            </div>
            <div>
              <input defaultValue="" />
            </div>
            <div>
              <input defaultValue="" />
            </div>
          </div>

          <div>
            <AttrLabel defaultValue="CAR" />
            <div>
              <input defaultValue={fullChar && fullChar.charCar} />
            </div>
            <div>
              <input defaultValue={fullChar && fullChar.charCarMod} />
            </div>
            <div>
              <input defaultValue="" />
            </div>
            <div>
              <input defaultValue="" />
            </div>
          </div>
        </AttributesContainer>

        <HealthClassContainer>
          <legend>Classes e Level</legend>
          <HealthContainer>
            <div>
              <div>
                <InputShort defaultValue={fullChar && fullChar.charLevel} />
                <label htmlFor="CharLevel">Level</label>
              </div>
              <div>
                <InputShort defaultValue={fullChar && fullChar.charExp} />
                <label htmlFor="charExp">Experiência</label>
              </div>
            </div>
            <div>
              <div>
                <InputShort defaultValue={fullChar && fullChar.charHealth} />
                <label htmlFor="charHealth">Pontos de Vida</label>
              </div>
              <div>
                <InputShort defaultValue={fullChar && fullChar.charHealth} />
                <label htmlFor="charHealth">Vida Atual</label>
              </div>
            </div>
          </HealthContainer>

          <ClassContainer>
            <div>
              <ClassInput defaultValue="Guerreiro" />
              <ClassValueInput defaultValue="1" />
            </div>
            <div>
              <ClassInput defaultValue="Mestre de Armas" />
              <ClassValueInput defaultValue="1" />
            </div>
            <div>
              <ClassInput defaultValue="Vendaval" />
              <ClassValueInput defaultValue="1" />
            </div>
            <div>
              <ClassInput defaultValue="Barbaro" />
              <ClassValueInput defaultValue="1" />
            </div>
          </ClassContainer>
        </HealthClassContainer>

        <ResistContainer>
          <legend>Testes de Resistência</legend>

          <MainResistContainer>
            <LabelContainer>
              <ResistMainLabel defaultValue="FORTITUDE" />
              <ResistLabel defaultValue="(Constituição)" />
            </LabelContainer>
            <InputResitContainer>
              <div>
                <label htmlFor="inputResist">total</label>
                <InputResit defaultValue="" />
              </div>
              <div>
                <label htmlFor="inputResist">base</label>
                <InputResit defaultValue="" />
              </div>
              <div>
                <label htmlFor="inputResist">mod</label>
                <InputResit defaultValue="" />
              </div>
              <div>
                <label htmlFor="inputResist">magic</label>
                <InputResit defaultValue="" />
              </div>
              <div>
                <label htmlFor="inputResist">outros</label>
                <InputResit defaultValue="" />
              </div>
              <div>
                <label htmlFor="inputResist">temp</label>
                <InputResit defaultValue="" />
              </div>
            </InputResitContainer>
          </MainResistContainer>

          <MainResistContainer>
            <LabelContainer>
              <ResistMainLabel defaultValue="REFLEXOS" />
              <ResistLabel defaultValue="(Destreza)" />
            </LabelContainer>
            <InputResitContainer>
              <div>
                <InputResit defaultValue="" />
              </div>
              <div>
                <InputResit defaultValue="" />
              </div>
              <div>
                <InputResit defaultValue="" />
              </div>
              <div>
                <InputResit defaultValue="" />
              </div>
              <div>
                <InputResit defaultValue="" />
              </div>
              <div>
                <InputResit defaultValue="" />
              </div>
            </InputResitContainer>
          </MainResistContainer>

          <MainResistContainer>
            <LabelContainer>
              <ResistMainLabel defaultValue="VONTADE" />
              <ResistLabel defaultValue="(Sabedoria)" />
            </LabelContainer>
            <InputResitContainer>
              <div>
                <InputResit defaultValue="" />
              </div>
              <div>
                <InputResit defaultValue="" />
              </div>
              <div>
                <InputResit defaultValue="" />
              </div>
              <div>
                <InputResit defaultValue="" />
              </div>
              <div>
                <InputResit defaultValue="" />
              </div>
              <div>
                <InputResit defaultValue="" />
              </div>
            </InputResitContainer>
          </MainResistContainer>

          <DefenseContainer>
            <InputResitContainer>
              <div>
                <DefenseMainLabel defaultValue="CA" />
              </div>

              <div>
                <label htmlFor="inputResist">total</label>
                <InputDefense defaultValue="" />
              </div>
              <div>
                <label htmlFor="inputResist">arm</label>
                <InputDefense defaultValue="" />
              </div>
              <div>
                <label htmlFor="inputResist">esc</label>
                <InputDefense defaultValue="" />
              </div>
              <div>
                <label htmlFor="inputResist">dest</label>
                <InputDefense defaultValue="" />
              </div>
              <div>
                <label htmlFor="inputResist">tam</label>
                <InputDefense defaultValue="" />
              </div>
              <div>
                <label htmlFor="inputResist">arm tot</label>
                <InputDefense defaultValue="" />
              </div>
              <div>
                <label htmlFor="inputResist">deflex</label>
                <InputDefense defaultValue="" />
              </div>
              <div>
                <label htmlFor="inputResist">outros</label>
                <InputDefense defaultValue="" />
              </div>
            </InputResitContainer>
          </DefenseContainer>
        </ResistContainer>
      </StatsContainer>
    </Container>
  )
}
