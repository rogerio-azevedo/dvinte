import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '~/services/api'
import CharClass from '~/components/CharClass'
import CharArmor from '~/components/CharArmor'
import CharWeapon from '~/components/CharWeapon'
import CharCa from '~/components/CharCa'
import ChaResist from '~/components/CharResist'

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
  ResistContainer,
  DefenseContainer,
  ArmoryContainer,
  ArmorContainer,
  WeaponContainer,
} from './styles'

export default function CharacterView() {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [char, setChar] = useState()
  const [classes, setClasses] = useState()
  const [armors, setArmors] = useState()
  const [weapons, setWeapons] = useState()
  const [resistences, setResistences] = useState()
  const [dextMod, setDextMod] = useState()

  useEffect(() => {
    async function loadChar() {
      const response = await api.get(`characters/${id}`)

      setChar(response.data)
      setClasses(response.data.Classes)
      setArmors(response.data.Armor)
      setWeapons(response.data.Weapon)
      setResistences(response.data.Resist)
      setDextMod(response.data.DesMod)

      setLoading(false)
    }

    loadChar()
  }, [id])

  return (
    <Container loading={loading ? 1 : 0}>
      <HeaderContainer>
        <legend>Dados Básicos</legend>
        <div>
          <Portrait>
            <img src={char && char.Portrait} alt="" />
          </Portrait>

          <BaseContainer>
            <LineContaniner>
              <div>
                <InputLarge defaultValue={char && char.Name} />
                <label htmlFor="CharName">Nome do Personagem</label>
              </div>

              <div>
                <InputLarge defaultValue={char && char.User} />
                <label htmlFor="CharName">Nome do Jogador</label>
              </div>

              <div>
                <InputLarge defaultValue={char && char.Race} />
                <label htmlFor="CharRace">Raça</label>
              </div>
              <div>
                <InputLarge defaultValue={char && char.Alig} />
                <label htmlFor="CharAlignment">Tendência</label>
              </div>
            </LineContaniner>

            <LineContaniner>
              <div>
                <InputShort defaultValue={char && char.Age} />
                <label htmlFor="CharAge">Idade</label>
              </div>

              <div>
                <InputMed defaultValue={char && char.Gender} />
                <label htmlFor="CharGender">Sexo</label>
              </div>
              <div>
                <InputMed defaultValue={char && char.Size} />
                <label htmlFor="CharSize">Tamanho</label>
              </div>
              <div>
                <InputLarge defaultValue={char && char.Divin} />
                <label htmlFor="CharDivinity">Divindade</label>
              </div>
            </LineContaniner>

            <LineContaniner>
              <div>
                <InputShort defaultValue={char && char.Height} />
                <label htmlFor="CharHeight">Altura</label>
              </div>
              <div>
                <InputShort defaultValue={char && char.Weight} />
                <label htmlFor="CharWeight">Peso</label>
              </div>
              <div>
                <InputMed defaultValue={char && char.Eye} />
                <label htmlFor="CharEye">Olhos</label>
              </div>
              <div>
                <InputMed defaultValue={char && char.Hair} />
                <label htmlFor="CharHair">Cabelos</label>
              </div>
              <div>
                <InputMed defaultValue={char && char.Skin} />
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
              <input defaultValue={char && char.Str} />
            </div>
            <div>
              <label htmlFor="inputResist">mod</label>
              <input defaultValue={char && char.StrMod} />
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
              <input defaultValue={char && char.Des} />
            </div>
            <div>
              <input defaultValue={char && char.DesMod} />
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
              <input defaultValue={char && char.Con} />
            </div>
            <div>
              <input defaultValue={char && char.ConMod} />
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
              <input defaultValue={char && char.Int} />
            </div>
            <div>
              <input defaultValue={char && char.IntMod} />
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
              <input defaultValue={char && char.Sab} />
            </div>
            <div>
              <input defaultValue={char && char.SabMod} />
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
              <input defaultValue={char && char.Car} />
            </div>
            <div>
              <input defaultValue={char && char.CarMod} />
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
                <InputShort defaultValue={char && char.Level} />
                <label htmlFor="CharLevel">Level</label>
              </div>
              <div>
                <InputShort defaultValue={char && char.Exp} />
                <label htmlFor="charExp">Experiência</label>
              </div>
            </div>
            <div>
              <div>
                <InputShort defaultValue={char && char.Health} />
                <label htmlFor="charHealth">Pontos de Vida</label>
              </div>
              <div>
                <InputShort defaultValue={char && char.HealthNow} />
                <label htmlFor="charHealth">Vida Atual</label>
              </div>
            </div>
          </HealthContainer>

          <ClassContainer>
            {!loading && <CharClass classes={classes} />}
          </ClassContainer>
        </HealthClassContainer>

        <ResistContainer>
          <legend>Testes de Resistência</legend>
          {!loading && <ChaResist resistences={resistences} />}
          <DefenseContainer>
            {!loading && <CharCa armors={armors} dextMod={dextMod} />}
          </DefenseContainer>
        </ResistContainer>
      </StatsContainer>
      <ArmoryContainer>
        <ArmorContainer>
          <legend>Armaduras e Escudos</legend>
          {!loading && <CharArmor armors={armors} />}
        </ArmorContainer>
      </ArmoryContainer>
      <ArmoryContainer>
        <WeaponContainer>
          <legend>Armas</legend>
          {!loading && <CharWeapon weapons={weapons} />}
        </WeaponContainer>
      </ArmoryContainer>
    </Container>
  )
}
