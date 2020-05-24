import React, { useState, useEffect } from 'react'
// import { useSelector } from 'react-redux'
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
  // const profile = useSelector(state => state.user.profile)

  const { id } = useParams()

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
      charPortrait: result.Portrait,
      playerName: result.User,
      charName: result.Name,
      charLevel: result.Level,
      charRace: result.Race,
      charHealth: result.Health,
      charHealthNow: result.HealthNow,
      charExp: result.Exp,
      charAge: result.Age,
      charGender: result.Gender,
      charSize: result.Size,
      charAlig: result.Alig,
      charDivin: result.Divin,

      charHeight: result.Height,
      charWeight: result.Weight,
      charEye: result.Eye,
      charHair: result.Hair,
      charSkin: result.Skin,

      charStr: result.Str,
      charStrMod: getModifier(result.Str),
      charDes: result.Des,
      charDesMod: getModifier(result.Des),
      charCon: result.Con,
      charConMod: getModifier(result.Con),
      charInt: result.Int,
      charIntMod: getModifier(result.Int),
      charSab: result.Sab,
      charSabMod: getModifier(result.Sab),
      charCar: result.Car,
      charCarMod: getModifier(result.Car),

      charClass: result.Classes,
    }

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
                <InputShort defaultValue={fullChar && fullChar.charAge} />
                <label htmlFor="CharAge">Idade</label>
              </div>

              <div>
                <InputMed
                  defaultValue={getGender(fullChar && fullChar.charGender)}
                />
                <label htmlFor="CharGender">Sexo</label>
              </div>
              <div>
                <InputMed
                  defaultValue={getSize(fullChar && fullChar.charSize)}
                />
                <label htmlFor="CharSize">Tamanho</label>
              </div>
              <div>
                <InputLarge defaultValue={fullChar && fullChar.charDivin} />
                <label htmlFor="CharDivinity">Divindade</label>
              </div>
            </LineContaniner>

            <LineContaniner>
              <div>
                <InputShort defaultValue={fullChar && fullChar.charHeight} />
                <label htmlFor="CharHeight">Altura</label>
              </div>
              <div>
                <InputShort defaultValue={fullChar && fullChar.charWeight} />
                <label htmlFor="CharWeight">Peso</label>
              </div>
              <div>
                <InputMed defaultValue={fullChar && fullChar.charEye} />
                <label htmlFor="CharEye">Olhos</label>
              </div>
              <div>
                <InputMed defaultValue={fullChar && fullChar.charHair} />
                <label htmlFor="CharHair">Cabelos</label>
              </div>
              <div>
                <InputMed defaultValue={fullChar && fullChar.charSkin} />
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
                <InputShort defaultValue={fullChar && fullChar.charHealthNow} />
                <label htmlFor="charHealth">Vida Atual</label>
              </div>
            </div>
          </HealthContainer>

          <ClassContainer>
            <ul>
              {fullChar &&
                fullChar.charClass.map((m, index) => (
                  // eslint-disable-next-line
                  <li key={index}>
                    <ClassInput defaultValue={m.name} />
                    <ClassValueInput defaultValue={m.level} />
                  </li>
                ))}
            </ul>
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
                <label htmlFor="inputResist">armad</label>
                <InputDefense defaultValue="" />
              </div>
              <div>
                <label htmlFor="inputResist">escudo</label>
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
