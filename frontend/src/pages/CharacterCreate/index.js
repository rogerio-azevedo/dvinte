import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import api from '~/services/api'

import { charPortraitRequest } from '~/store/modules/character/actions'

import ButtonPrev from '~/components/ButtonPrev'
import ButtonNext from '~/components/ButtonNext'

import * as Styles from './styles'

export default function CharacterBase() {
  const selected = useSelector(
    state => state.character && state.character.portrait
  )

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [portraits, setPortraits] = useState([])
  const [picked, setPicked] = useState(selected)

  function handlePick(item) {
    setPicked(item?.id)
    dispatch(charPortraitRequest({ portrait: item.id }))
  }

  useEffect(() => {
    async function loadList() {
      setLoading(true)
      const portrait = await api.get('portraits')

      setPortraits(portrait.data)
      setLoading(false)
    }

    loadList()
  }, [])

  return (
    <Styles.Container loading={loading ? 1 : 0}>
      <ButtonPrev linkto="charactercreate" display="hide" />

      <Styles.ContentContainer>
        <h1>Cadastro de Personagem - RETRATO</h1>
        <Styles.ImageContainer ispicked={picked}>
          {portraits?.map(item => (
            <ul key={item.id}>
              <li>
                <Styles.Item
                  onClick={() => handlePick(item)}
                  ispicked={picked === item.id ? 1 : 0}
                >
                  <img src={item.url} alt="" />
                </Styles.Item>
              </li>
            </ul>
          ))}
        </Styles.ImageContainer>
        <Styles.DivPage>
          <Link to="charactercreate">
            <Styles.ActivePage />
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
            <Styles.Page />
          </Link>
        </Styles.DivPage>
      </Styles.ContentContainer>

      <ButtonNext linkto="charbase" display="show" />
    </Styles.Container>
  )
}
