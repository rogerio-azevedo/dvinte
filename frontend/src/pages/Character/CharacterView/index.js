import React, { useState, useEffect } from 'react'
import loadable from '@loadable/component'
import { useParams } from 'react-router-dom'
import api from '~/services/api'

// import CharClass from '~/components/CharClass'
//import CharArmor from '~/components/CharArmor'
//import CharWeapon from '~/components/CharWeapon'
//import CharCa from '~/components/CharCa'
//import ChaResist from '~/components/CharResist'

import * as Styles from './styles'

//const CharClass = loadable(() => import('./components/CharClass'))

// eslint-disable-next-line
const CharClass = loadable(() => import('~/components/CharClass'))

// eslint-disable-next-line
const CharArmor = loadable(() => import('~/components/CharArmor'))

// eslint-disable-next-line
const CharWeapon = loadable(() => import('~/components/CharWeapon'))

// eslint-disable-next-line
const CharCa = loadable(() => import('~/components/CharCa'))

// eslint-disable-next-line
const ChaResist = loadable(() => import('~/components/CharResist'))

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
    <Styles.Container loading={loading ? 1 : 0}>
      <Styles.HeaderContainer>
        <legend>Dados Básicos</legend>
        <div>
          <Styles.Portrait>
            <img src={char && char.Portrait} alt="" />
          </Styles.Portrait>

          <Styles.BaseContainer>
            <Styles.LineContaniner>
              <div>
                <Styles.InputLarge defaultValue={char && char.Name} />
                <label htmlFor="CharName">Nome do Personagem</label>
              </div>

              <div>
                <Styles.InputLarge defaultValue={char && char.User} />
                <label htmlFor="CharName">Nome do Jogador</label>
              </div>

              <div>
                <Styles.InputLarge defaultValue={char && char.Race} />
                <label htmlFor="CharRace">Raça</label>
              </div>
              <div>
                <Styles.InputLarge defaultValue={char && char.Alig} />
                <label htmlFor="CharAlignment">Tendência</label>
              </div>
            </Styles.LineContaniner>

            <Styles.LineContaniner>
              <div>
                <Styles.InputShort defaultValue={char && char.Age} />
                <label htmlFor="CharAge">Idade</label>
              </div>

              <div>
                <Styles.InputMed defaultValue={char && char.Gender} />
                <label htmlFor="CharGender">Sexo</label>
              </div>
              <div>
                <Styles.InputMed defaultValue={char && char.Size} />
                <label htmlFor="CharSize">Tamanho</label>
              </div>
              <div>
                <Styles.InputLarge defaultValue={char && char.Divin} />
                <label htmlFor="CharDivinity">Divindade</label>
              </div>
            </Styles.LineContaniner>

            <Styles.LineContaniner>
              <div>
                <Styles.InputShort defaultValue={char && char.Height} />
                <label htmlFor="CharHeight">Altura</label>
              </div>
              <div>
                <Styles.InputShort defaultValue={char && char.Weight} />
                <label htmlFor="CharWeight">Peso</label>
              </div>
              <div>
                <Styles.InputMed defaultValue={char && char.Eye} />
                <label htmlFor="CharEye">Olhos</label>
              </div>
              <div>
                <Styles.InputMed defaultValue={char && char.Hair} />
                <label htmlFor="CharHair">Cabelos</label>
              </div>
              <div>
                <Styles.InputMed defaultValue={char && char.Skin} />
                <label htmlFor="CharSkin">Pele</label>
              </div>
            </Styles.LineContaniner>
          </Styles.BaseContainer>
        </div>
      </Styles.HeaderContainer>

      <Styles.StatsContainer>
        <Styles.AttributesContainer>
          <legend>Atributos</legend>
          <div>
            <Styles.AttrLabel1 defaultValue="FOR" />
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
              <input defaultValue={char && char.StrTemp} />
            </div>
            <div>
              <label htmlFor="inputResist">m.temp</label>
              <input defaultValue={char && char.StrModTemp} />
            </div>
          </div>

          <div>
            <Styles.AttrLabel defaultValue="DES" />
            <div>
              <input defaultValue={char && char.Des} />
            </div>
            <div>
              <input defaultValue={char && char.DesMod} />
            </div>
            <div>
              <input defaultValue={char && char.DesTemp} />
            </div>
            <div>
              <input defaultValue={char && char.DesModTemp} />
            </div>
          </div>

          <div>
            <Styles.AttrLabel defaultValue="CON" />
            <div>
              <input defaultValue={char && char.Con} />
            </div>
            <div>
              <input defaultValue={char && char.ConMod} />
            </div>
            <div>
              <input defaultValue={char && char.ConTemp} />
            </div>
            <div>
              <input defaultValue={char && char.ConModTemp} />
            </div>
          </div>

          <div>
            <Styles.AttrLabel defaultValue="INT" />
            <div>
              <input defaultValue={char && char.Int} />
            </div>
            <div>
              <input defaultValue={char && char.IntMod} />
            </div>
            <div>
              <input defaultValue={char && char.IntTemp} />
            </div>
            <div>
              <input defaultValue={char && char.IntModTemp} />
            </div>
          </div>

          <div>
            <Styles.AttrLabel defaultValue="SAB" />
            <div>
              <input defaultValue={char && char.Sab} />
            </div>
            <div>
              <input defaultValue={char && char.SabMod} />
            </div>
            <div>
              <input defaultValue={char && char.SabTemp} />
            </div>
            <div>
              <input defaultValue={char && char.SabModTemp} />
            </div>
          </div>

          <div>
            <Styles.AttrLabel defaultValue="CAR" />
            <div>
              <input defaultValue={char && char.Car} />
            </div>
            <div>
              <input defaultValue={char && char.CarMod} />
            </div>
            <div>
              <input defaultValue={char && char.CarTemp} />
            </div>
            <div>
              <input defaultValue={char && char.CarModTemp} />
            </div>
          </div>
        </Styles.AttributesContainer>

        <Styles.HealthClassContainer>
          <legend>Classes e Level</legend>
          <Styles.HealthContainer>
            <div>
              <div>
                <Styles.InputShort defaultValue={char && char.Level} />
                <label htmlFor="CharLevel">Level</label>
              </div>
              <div>
                <Styles.InputShort defaultValue={char && char.Exp} />
                <label htmlFor="charExp">Experiência</label>
              </div>
            </div>
            <div>
              <div>
                <Styles.InputShort defaultValue={char && char.Health} />
                <label htmlFor="charHealth">Pontos de Vida</label>
              </div>
              <div>
                <Styles.InputShort defaultValue={char && char.HealthNow} />
                <label htmlFor="charHealth">Vida Atual</label>
              </div>
            </div>
          </Styles.HealthContainer>

          <Styles.ClassContainer>
            {!loading && <CharClass classes={classes} />}
          </Styles.ClassContainer>
        </Styles.HealthClassContainer>

        <Styles.ResistContainer>
          <legend>Testes de Resistência</legend>
          {!loading && <ChaResist resistences={resistences} />}
          <Styles.DefenseContainer>
            {!loading && <CharCa armors={armors} dextMod={dextMod} />}
          </Styles.DefenseContainer>
        </Styles.ResistContainer>
      </Styles.StatsContainer>
      <Styles.ArmoryContainer>
        <Styles.ArmorContainer>
          <legend>Armaduras e Escudos</legend>
          {!loading && <CharArmor armors={armors} />}
        </Styles.ArmorContainer>
      </Styles.ArmoryContainer>
      <Styles.ArmoryContainer>
        <Styles.WeaponContainer>
          <legend>Armas</legend>
          {!loading && <CharWeapon weapons={weapons} />}
        </Styles.WeaponContainer>
      </Styles.ArmoryContainer>
    </Styles.Container>
  )
}
