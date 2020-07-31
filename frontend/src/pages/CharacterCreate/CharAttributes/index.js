import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa'

import { charAttrsRequest } from '~/store/modules/character/actions'

import ButtonPrev from '~/components/ButtonPrev'
import ButtonNext from '~/components/ButtonNext'

import * as Styles from './styles'

export default function CharAttributes() {
  const strStore = useSelector(state => state.character?.attributes?.str || 8)
  const dexStore = useSelector(state => state.character?.attributes?.dex || 8)
  const conStore = useSelector(state => state.character?.attributes?.con || 8)
  const intStore = useSelector(state => state.character?.attributes?.int || 8)
  const wisStore = useSelector(state => state.character?.attributes?.wis || 8)
  const chaStore = useSelector(state => state.character?.attributes?.cha || 8)

  const dispatch = useDispatch()
  const [str, setStr] = useState(strStore)
  const [dex, setDex] = useState(dexStore)
  const [con, setCon] = useState(conStore)
  const [int, setInt] = useState(intStore)
  const [wis, setWis] = useState(wisStore)
  const [cha, setCha] = useState(chaStore)

  const points = 32
  const [spent, setSpent] = useState(0)

  useEffect(() => {
    let totalPoints = 0

    switch (str) {
      case 9:
        totalPoints -= 1
        break

      case 10:
        totalPoints -= 2
        break

      case 11:
        totalPoints -= 3
        break

      case 12:
        totalPoints -= 4
        break

      case 13:
        totalPoints -= 5
        break

      case 14:
        totalPoints -= 6
        break

      case 15:
        totalPoints -= 8
        break

      case 16:
        totalPoints -= 10
        break

      case 17:
        totalPoints -= 13
        break

      case 18:
        totalPoints -= 16
        break
      default:
    }

    switch (dex) {
      case 9:
        totalPoints -= 1
        break

      case 10:
        totalPoints -= 2
        break

      case 11:
        totalPoints -= 3
        break

      case 12:
        totalPoints -= 4
        break

      case 13:
        totalPoints -= 5
        break

      case 14:
        totalPoints -= 6
        break

      case 15:
        totalPoints -= 8
        break

      case 16:
        totalPoints -= 10
        break

      case 17:
        totalPoints -= 13
        break

      case 18:
        totalPoints -= 16
        break
      default:
    }

    switch (con) {
      case 9:
        totalPoints -= 1
        break

      case 10:
        totalPoints -= 2
        break

      case 11:
        totalPoints -= 3
        break

      case 12:
        totalPoints -= 4
        break

      case 13:
        totalPoints -= 5
        break

      case 14:
        totalPoints -= 6
        break

      case 15:
        totalPoints -= 8
        break

      case 16:
        totalPoints -= 10
        break

      case 17:
        totalPoints -= 13
        break

      case 18:
        totalPoints -= 16
        break
      default:
    }

    switch (int) {
      case 9:
        totalPoints -= 1
        break

      case 10:
        totalPoints -= 2
        break

      case 11:
        totalPoints -= 3
        break

      case 12:
        totalPoints -= 4
        break

      case 13:
        totalPoints -= 5
        break

      case 14:
        totalPoints -= 6
        break

      case 15:
        totalPoints -= 8
        break

      case 16:
        totalPoints -= 10
        break

      case 17:
        totalPoints -= 13
        break

      case 18:
        totalPoints -= 16
        break
      default:
    }

    switch (wis) {
      case 9:
        totalPoints -= 1
        break

      case 10:
        totalPoints -= 2
        break

      case 11:
        totalPoints -= 3
        break

      case 12:
        totalPoints -= 4
        break

      case 13:
        totalPoints -= 5
        break

      case 14:
        totalPoints -= 6
        break

      case 15:
        totalPoints -= 8
        break

      case 16:
        totalPoints -= 10
        break

      case 17:
        totalPoints -= 13
        break

      case 18:
        totalPoints -= 16
        break
      default:
    }

    switch (cha) {
      case 9:
        totalPoints -= 1
        break

      case 10:
        totalPoints -= 2
        break

      case 11:
        totalPoints -= 3
        break

      case 12:
        totalPoints -= 4
        break

      case 13:
        totalPoints -= 5
        break

      case 14:
        totalPoints -= 6
        break

      case 15:
        totalPoints -= 8
        break

      case 16:
        totalPoints -= 10
        break

      case 17:
        totalPoints -= 13
        break

      case 18:
        totalPoints -= 16
        break
      default:
    }

    setSpent(totalPoints)
  }, [str, dex, con, int, wis, cha])

  useEffect(() => {}, [spent])

  function handleAdd(tipo) {
    switch (tipo) {
      case 'str':
        if (str <= 17) {
          setStr(str + 1)
        }
        break

      case 'dex':
        if (dex <= 17) {
          setDex(dex + 1)
        }
        break

      case 'con':
        if (con <= 17) {
          setCon(con + 1)
        }
        break

      case 'int':
        if (int <= 17) {
          setInt(int + 1)
        }
        break

      case 'wis':
        if (wis <= 17) {
          setWis(wis + 1)
        }
        break

      case 'cha':
        if (cha <= 17) {
          setCha(cha + 1)
        }
        break
      default:
    }
  }

  async function handleRemove(tipo) {
    switch (tipo) {
      case 'str':
        if (str >= 9) {
          setStr(str - 1)
        }
        break

      case 'dex':
        if (dex >= 9) {
          setDex(dex - 1)
        }
        break

      case 'con':
        if (con >= 9) {
          setCon(con - 1)
        }
        break

      case 'int':
        if (int >= 9) {
          setInt(int - 1)
        }
        break

      case 'wis':
        if (wis >= 9) {
          setWis(wis - 1)
        }
        break

      case 'cha':
        if (cha >= 9) {
          setCha(cha - 1)
        }
        break

      default:
    }
  }

  function handleSave() {
    const attrs = {
      str,
      dex,
      con,
      int,
      wis,
      cha,
    }
    dispatch(charAttrsRequest(attrs))
  }

  return (
    <Styles.Container>
      <ButtonPrev linkto="charclass" display="show" />

      <Styles.ContentContainer>
        <h1>{`Cadastro de Personagem - ATRIBUTOS - ${points} / ${spent}`}</h1>
        <Styles.FormContainer>
          <div>
            <Styles.AttributesContainer>
              <Styles.GroupContainer>
                <Styles.AttrLabel readOnly defaultValue="FOR" />
                <Styles.ValueContainer>
                  <Styles.AttrValue
                    pattern="[0-9]*"
                    min="1"
                    max="9"
                    value={str}
                    readOnly
                  />
                  <Styles.ButtonsContainer>
                    <Styles.ButtonBorder>
                      <FaPlusCircle
                        size={22}
                        color="#8e0e00"
                        cursor="pointer"
                        onClick={() => handleAdd('str')}
                      />
                    </Styles.ButtonBorder>
                    <Styles.ButtonBorder>
                      <FaMinusCircle
                        size={22}
                        color="#8e0e00"
                        cursor="pointer"
                        onClick={() => handleRemove('str')}
                      />
                    </Styles.ButtonBorder>
                  </Styles.ButtonsContainer>
                </Styles.ValueContainer>
              </Styles.GroupContainer>

              <Styles.GroupContainer>
                <Styles.AttrLabel readOnly defaultValue="DES" />
                <Styles.ValueContainer>
                  <Styles.AttrValue
                    pattern="[0-9]*"
                    min="1"
                    max="9"
                    value={dex}
                    readOnly
                  />
                  <Styles.ButtonsContainer>
                    <Styles.ButtonBorder>
                      <FaPlusCircle
                        size={22}
                        color="#8e0e00"
                        cursor="pointer"
                        onClick={() => handleAdd('dex')}
                      />
                    </Styles.ButtonBorder>
                    <Styles.ButtonBorder>
                      <FaMinusCircle
                        size={22}
                        color="#8e0e00"
                        cursor="pointer"
                        onClick={() => handleRemove('dex')}
                      />
                    </Styles.ButtonBorder>
                  </Styles.ButtonsContainer>
                </Styles.ValueContainer>
              </Styles.GroupContainer>

              <Styles.GroupContainer>
                <Styles.AttrLabel readOnly defaultValue="CON" />
                <Styles.ValueContainer>
                  <Styles.AttrValue
                    pattern="[0-9]*"
                    min="1"
                    max="9"
                    value={con}
                    readOnly
                  />
                  <Styles.ButtonsContainer>
                    <Styles.ButtonBorder>
                      <FaPlusCircle
                        size={22}
                        color="#8e0e00"
                        cursor="pointer"
                        onClick={() => handleAdd('con')}
                      />
                    </Styles.ButtonBorder>
                    <Styles.ButtonBorder>
                      <FaMinusCircle
                        size={22}
                        color="#8e0e00"
                        cursor="pointer"
                        onClick={() => handleRemove('con')}
                      />
                    </Styles.ButtonBorder>
                  </Styles.ButtonsContainer>
                </Styles.ValueContainer>
              </Styles.GroupContainer>

              <Styles.GroupContainer>
                <Styles.AttrLabel readOnly defaultValue="INT" />
                <Styles.ValueContainer>
                  <Styles.AttrValue
                    pattern="[0-9]*"
                    min="1"
                    max="9"
                    value={int}
                    readOnly
                  />
                  <Styles.ButtonsContainer>
                    <Styles.ButtonBorder>
                      <FaPlusCircle
                        size={22}
                        color="#8e0e00"
                        cursor="pointer"
                        onClick={() => handleAdd('int')}
                      />
                    </Styles.ButtonBorder>
                    <Styles.ButtonBorder>
                      <FaMinusCircle
                        size={22}
                        color="#8e0e00"
                        cursor="pointer"
                        onClick={() => handleRemove('int')}
                      />
                    </Styles.ButtonBorder>
                  </Styles.ButtonsContainer>
                </Styles.ValueContainer>
              </Styles.GroupContainer>

              <Styles.GroupContainer>
                <Styles.AttrLabel readOnly defaultValue="SAB" />
                <Styles.ValueContainer>
                  <Styles.AttrValue
                    pattern="[0-9]*"
                    min="1"
                    max="9"
                    value={wis}
                    readOnly
                  />
                  <Styles.ButtonsContainer>
                    <Styles.ButtonBorder>
                      <FaPlusCircle
                        size={22}
                        color="#8e0e00"
                        cursor="pointer"
                        onClick={() => handleAdd('wis')}
                      />
                    </Styles.ButtonBorder>
                    <Styles.ButtonBorder>
                      <FaMinusCircle
                        size={22}
                        color="#8e0e00"
                        cursor="pointer"
                        onClick={() => handleRemove('wis')}
                      />
                    </Styles.ButtonBorder>
                  </Styles.ButtonsContainer>
                </Styles.ValueContainer>
              </Styles.GroupContainer>

              <Styles.GroupContainer>
                <Styles.AttrLabel readOnly defaultValue="CAR" />
                <Styles.ValueContainer>
                  <Styles.AttrValue
                    pattern="[0-9]*"
                    min="1"
                    max="9"
                    value={cha}
                    readOnly
                  />
                  <Styles.ButtonsContainer>
                    <Styles.ButtonBorder>
                      <FaPlusCircle
                        size={25}
                        color="#8e0e00"
                        cursor="pointer"
                        onClick={() => handleAdd('cha')}
                      />
                    </Styles.ButtonBorder>
                    <Styles.ButtonBorder>
                      <FaMinusCircle
                        size={25}
                        color="#8e0e00"
                        cursor="pointer"
                        onClick={() => handleRemove('cha')}
                      />
                    </Styles.ButtonBorder>
                  </Styles.ButtonsContainer>
                </Styles.ValueContainer>
              </Styles.GroupContainer>
            </Styles.AttributesContainer>
          </div>
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
            <Styles.ActivePage />
          </Link>

          <Link to="charpreview">
            <Styles.Page />
          </Link>
        </Styles.DivPage>
      </Styles.ContentContainer>

      <ButtonNext linkto="charpreview" display="show" handleSave={handleSave} />
    </Styles.Container>
  )
}
