import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '~/services/api'

import * as Styles from './styles'

export default function MonsterDetail() {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [monster, setMonster] = useState()
  const [attributes, setAttributes] = useState()

  useEffect(() => {
    async function loadChar() {
      const response = await api.get(`monsters/${id}`)
      const { data } = response
      console.log(data)
      setMonster(data)
      setAttributes(data?.monster_attribute)
      //      setWeapons(response.data.Weapon)
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
            <img src={monster?.monster_url} alt="" />
          </Styles.Portrait>

          <Styles.BaseContainer>
            <Styles.LineContaniner>
              <div>
                <Styles.InputLarge readOnly defaultValue={monster?.name} />
                <label htmlFor="CharName">Nome do Monstro</label>
              </div>

              <div>
                <Styles.InputLarge readOnly defaultValue={monster?.Race} />
                <label htmlFor="CharRace">Raça</label>
              </div>
              <div>
                <Styles.InputLarge readOnly defaultValue={monster?.Alig} />
                <label htmlFor="CharAlignment">Tendência</label>
              </div>
            </Styles.LineContaniner>

            <Styles.LineContaniner>
              <div>
                <Styles.InputShort readOnly defaultValue={monster?.Age} />
                <label htmlFor="CharAge">Idade</label>
              </div>

              <div>
                <Styles.InputMed readOnly defaultValue={monster?.Gender} />
                <label htmlFor="CharGender">Sexo</label>
              </div>
              <div>
                <Styles.InputMed readOnly defaultValue={monster?.Size} />
                <label htmlFor="CharSize">Tamanho</label>
              </div>
              <div>
                <Styles.InputLarge readOnly defaultValue={monster?.Divin} />
                <label htmlFor="CharDivinity">Divindade</label>
              </div>
            </Styles.LineContaniner>

            <Styles.LineContaniner>
              <div>
                <Styles.InputShort defaultValue={monster?.Height} />
                <label htmlFor="CharHeight">Altura</label>
              </div>
              <div>
                <Styles.InputShort readOnly defaultValue={monster?.Weight} />
                <label htmlFor="CharWeight">Peso</label>
              </div>
              <div>
                <Styles.InputMed readOnly defaultValue={monster?.Eye} />
                <label htmlFor="CharEye">Olhos</label>
              </div>
              <div>
                <Styles.InputMed readOnly defaultValue={monster?.Hair} />
                <label htmlFor="CharHair">Cabelos</label>
              </div>
              <div>
                <Styles.InputMed readOnly defaultValue={monster?.Skin} />
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
            <Styles.AttrLabel1 readOnly defaultValue="FOR" />
            <div>
              <label htmlFor="inputResist">valor</label>
              <input readOnly defaultValue={attributes?.strength} />
            </div>
          </div>

          <div>
            <Styles.AttrLabel readOnly defaultValue="DES" />
            <div>
              <input readOnly defaultValue={attributes?.dexterity} />
            </div>
          </div>

          <div>
            <Styles.AttrLabel readOnly defaultValue="CON" />
            <div>
              <input readOnly defaultValue={attributes?.constitution} />
            </div>
          </div>

          <div>
            <Styles.AttrLabel readOnly defaultValue="INT" />
            <div>
              <input readOnly defaultValue={attributes?.intelligence} />
            </div>
          </div>

          <div>
            <Styles.AttrLabel readOnly defaultValue="SAB" />
            <div>
              <input readOnly defaultValue={attributes?.wisdom} />
            </div>
          </div>

          <div>
            <Styles.AttrLabel readOnly defaultValue="CAR" />
            <div>
              <input readOnly defaultValue={attributes?.charisma} />
            </div>
          </div>
        </Styles.AttributesContainer>

        <Styles.HealthClassContainer>
          <legend>Classes e Level</legend>
          <Styles.HealthContainer>
            <div>
              <div>
                <Styles.InputMini readOnly defaultValue={monster?.Level} />
                <label htmlFor="CharLevel">Level</label>
              </div>
              <div>
                <Styles.InputMini readOnly defaultValue={monster?.Exp} />
                <label htmlFor="charExp">Experiência</label>
              </div>
            </div>
            <div>
              <div>
                <Styles.InputMini readOnly defaultValue={monster?.Health} />
                <label htmlFor="charHealth">PV</label>
              </div>
              <div>
                <Styles.InputMini readOnly defaultValue={monster?.HealthNow} />
                <label htmlFor="charHealth">PV Atual</label>
              </div>
            </div>
            <div>
              <div>
                <Styles.InputMini readOnly defaultValue={monster?.initiative} />
                <label htmlFor="charExp">Iniciativa</label>
              </div>
              <div>
                <Styles.InputMini readOnly defaultValue={monster?.initiative} />
                <label htmlFor="charExp">Iniciativa</label>
              </div>
            </div>
          </Styles.HealthContainer>

          <Styles.ClassContainer>
            {/* {!loading && <CharClass classes={classes} />} */}
          </Styles.ClassContainer>
        </Styles.HealthClassContainer>

        <Styles.ResistContainer>
          <legend>Testes de Resistência</legend>
          {/* {!loading && <CharResist resist={resist} />} */}
          <Styles.DefenseContainer>
            {/* {!loading && <CharCa armors={armors} dextMod={dexMod} />} */}
          </Styles.DefenseContainer>
        </Styles.ResistContainer>
      </Styles.StatsContainer>
      <Styles.ArmoryContainer></Styles.ArmoryContainer>
      <Styles.ArmoryContainer>
        <Styles.WeaponContainer>
          <legend>Armas</legend>
          {monster?.monster_attack.map(attack => (
            <ul key={Math.random() + attack.name}>
              <li>{attack.name}</li>
            </ul>
          ))}
        </Styles.WeaponContainer>
      </Styles.ArmoryContainer>
      <Styles.ArmoryContainer></Styles.ArmoryContainer>
    </Styles.Container>
  )
}
