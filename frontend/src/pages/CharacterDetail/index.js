import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '~/services/api'

import CharClass from '~/components/CharClass'
import CharArmor from '~/components/CharArmor'
import CharWeapon from '~/components/CharWeapon'
import CharCa from '~/components/CharCa'
import CharResist from '~/components/CharResist'

import * as Styles from './styles'

export default function CharacterDetail() {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [char, setChar] = useState()
  const [classes, setClasses] = useState()
  const [armors, setArmors] = useState()
  const [weapons, setWeapons] = useState()
  const [resist, setResist] = useState()
  const [resistMod, setResistMod] = useState()
  const [dextMod, setDextMod] = useState()

  useEffect(() => {
    async function loadChar() {
      const response = await api.get(`characters/${id}`)

      setChar(response.data)
      setClasses(response.data.Classes)
      setArmors(response.data.Armor)
      setWeapons(response.data.Weapon)
      setResist(response.data.Classes)
      setDextMod(response.data.DexMod)

      setResistMod({
        fortMod: response.data && response.data.StrMod,
        fortModTemp: response.data && response.data.StrModTemp,

        reflexMod: response.data && response.data.DexMod,
        reflexModTemp: response.data && response.data.DexModTemp,

        wisdMod: response.data && response.data.WisMod,
        wisdModTemp: response.data && response.data.WisModTemp,
      })

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
                <Styles.InputLarge readOnly defaultValue={char && char.Name} />
                <label htmlFor="CharName">Nome do Personagem</label>
              </div>

              <div>
                <Styles.InputLarge readOnly defaultValue={char && char.User} />
                <label htmlFor="CharName">Nome do Jogador</label>
              </div>

              <div>
                <Styles.InputLarge readOnly defaultValue={char && char.Race} />
                <label htmlFor="CharRace">Raça</label>
              </div>
              <div>
                <Styles.InputLarge readOnly defaultValue={char && char.Alig} />
                <label htmlFor="CharAlignment">Tendência</label>
              </div>
            </Styles.LineContaniner>

            <Styles.LineContaniner>
              <div>
                <Styles.InputShort readOnly defaultValue={char && char.Age} />
                <label htmlFor="CharAge">Idade</label>
              </div>

              <div>
                <Styles.InputMed readOnly defaultValue={char && char.Gender} />
                <label htmlFor="CharGender">Sexo</label>
              </div>
              <div>
                <Styles.InputMed readOnly defaultValue={char && char.Size} />
                <label htmlFor="CharSize">Tamanho</label>
              </div>
              <div>
                <Styles.InputLarge readOnly defaultValue={char && char.Divin} />
                <label htmlFor="CharDivinity">Divindade</label>
              </div>
            </Styles.LineContaniner>

            <Styles.LineContaniner>
              <div>
                <Styles.InputShort defaultValue={char && char.Height} />
                <label htmlFor="CharHeight">Altura</label>
              </div>
              <div>
                <Styles.InputShort
                  readOnly
                  defaultValue={char && char.Weight}
                />
                <label htmlFor="CharWeight">Peso</label>
              </div>
              <div>
                <Styles.InputMed readOnly defaultValue={char && char.Eye} />
                <label htmlFor="CharEye">Olhos</label>
              </div>
              <div>
                <Styles.InputMed readOnly defaultValue={char && char.Hair} />
                <label htmlFor="CharHair">Cabelos</label>
              </div>
              <div>
                <Styles.InputMed readOnly defaultValue={char && char.Skin} />
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
              <input readOnly defaultValue={char && char.Str} />
            </div>
            <div>
              <label htmlFor="inputResist">mod</label>
              <input readOnly defaultValue={char && char.StrMod} />
            </div>
            <div>
              <label htmlFor="inputResist">v.temp</label>
              <input readOnly defaultValue={char && char.StrTemp} />
            </div>
            <div>
              <label htmlFor="inputResist">m.temp</label>
              <input readOnly defaultValue={char && char.StrModTemp} />
            </div>
          </div>

          <div>
            <Styles.AttrLabel readOnly defaultValue="DES" />
            <div>
              <input readOnly defaultValue={char && char.Dex} />
            </div>
            <div>
              <input readOnly defaultValue={char && char.DexMod} />
            </div>
            <div>
              <input readOnly defaultValue={char && char.DexTemp} />
            </div>
            <div>
              <input readOnly defaultValue={char && char.DexModTemp} />
            </div>
          </div>

          <div>
            <Styles.AttrLabel readOnly defaultValue="CON" />
            <div>
              <input readOnly defaultValue={char && char.Con} />
            </div>
            <div>
              <input readOnly defaultValue={char && char.ConMod} />
            </div>
            <div>
              <input readOnly defaultValue={char && char.ConTemp} />
            </div>
            <div>
              <input readOnly defaultValue={char && char.ConModTemp} />
            </div>
          </div>

          <div>
            <Styles.AttrLabel readOnly defaultValue="INT" />
            <div>
              <input readOnly defaultValue={char && char.Int} />
            </div>
            <div>
              <input readOnly defaultValue={char && char.IntMod} />
            </div>
            <div>
              <input readOnly defaultValue={char && char.IntTemp} />
            </div>
            <div>
              <input readOnly defaultValue={char && char.IntModTemp} />
            </div>
          </div>

          <div>
            <Styles.AttrLabel readOnly defaultValue="SAB" />
            <div>
              <input readOnly defaultValue={char && char.Wis} />
            </div>
            <div>
              <input readOnly defaultValue={char && char.WisMod} />
            </div>
            <div>
              <input readOnly defaultValue={char && char.WisTemp} />
            </div>
            <div>
              <input readOnly defaultValue={char && char.WisModTemp} />
            </div>
          </div>

          <div>
            <Styles.AttrLabel readOnly defaultValue="CAR" />
            <div>
              <input readOnly defaultValue={char && char.Cha} />
            </div>
            <div>
              <input readOnly defaultValue={char && char.ChaMod} />
            </div>
            <div>
              <input readOnly defaultValue={char && char.ChaTemp} />
            </div>
            <div>
              <input readOnly defaultValue={char && char.ChaModTemp} />
            </div>
          </div>
        </Styles.AttributesContainer>

        <Styles.HealthClassContainer>
          <legend>Classes e Level</legend>
          <Styles.HealthContainer>
            <div>
              <div>
                <Styles.InputShort readOnly defaultValue={char && char.Level} />
                <label htmlFor="CharLevel">Level</label>
              </div>
              <div>
                <Styles.InputShort readOnly defaultValue={char && char.Exp} />
                <label htmlFor="charExp">Experiência</label>
              </div>
            </div>
            <div>
              <div>
                <Styles.InputShort
                  readOnly
                  defaultValue={char && char.Health}
                />
                <label htmlFor="charHealth">Pontos de Vida</label>
              </div>
              <div>
                <Styles.InputShort
                  readOnly
                  defaultValue={char && char.HealthNow}
                />
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
          {!loading && (
            <CharResist
              resist={resist}
              resistMod={resistMod}
              loading={loading}
            />
          )}
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
