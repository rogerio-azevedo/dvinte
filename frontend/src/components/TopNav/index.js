import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import api from '~/services/api'

import logoKiper from '~/assets/logo_black.svg'
import logoPorter from '~/assets/logo_red.svg'

import { Navigation, Container, Dropmenu, Logo } from './styles'

export default function TopNav() {
  // const [link, setLink] = useState('')
  // const profile = useSelector(state => state.user.profile)
  const perfil = true
  const container = React.createRef()

  // useEffect(() => {
  //   async function load() {
  //     // const response = await api.get('myprofile', {
  //     //   params: {
  //     //     user: profile.id,
  //     //   },
  //     // })
  //     // setLink(`/characterview/${response.data}`)
  //   }
  //   load()
  // }, [profile])

  // const [dig, setDig] = useState(false)
  // const [rel, setRel] = useState(false)
  const [cad, setCad] = useState(false)
  const [cha, setCha] = useState(false)

  // function handleDiagClick() {
  //   setDig(!dig)
  //   setRel(false)
  //   setCad(false)
  //   setAte(false)
  // }

  function handleChaClick() {
    setCha(!cha)
    // setDig(false)
    setCad(false)
    // setAte(false)
  }

  function handleCadClick() {
    setCad(!cad)
    setCha(false)
    // setRel(false)
    // setAte(false)
  }

  // function handleAteClick() {
  //   setAte(!ate)
  //   setDig(false)
  //   setRel(false)
  //   setCad(false)
  // }

  function handleRemoveClick() {
    // setDig(false)
    // setRel(false)
    setCad(false)
    setCha(false)
  }

  // eslint-disable-next-line
  function handleClickOutside(event) {
    if (container.current && !container.current.contains(event.target)) {
      // setDig(false)
      // setRel(false)
      setCad(false)
      setCha(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
  }, [handleClickOutside])

  return (
    <Navigation>
      <Logo perfil={perfil} src={perfil ? logoKiper : logoPorter} alt="Kiper" />

      <Container ref={container} perfil={perfil}>
        <ul>
          <Link onClick={handleRemoveClick} to="/dashboard">
            DASHBOARD
          </Link>

          <li>
            {/* eslint-disable-next-line */}
            <strong onClick={handleCadClick}>CADASTROS</strong>
            <Dropmenu rel={cad ? 1 : 0} perfil={perfil}>
              <ul>
                <li>
                  <Link onClick={handleRemoveClick} to="/alignments">
                    Alinhamentos
                  </Link>
                </li>
                <li>
                  <Link onClick={handleRemoveClick} to="/armors">
                    Armaduras
                  </Link>
                </li>
                <li>
                  <Link onClick={handleRemoveClick} to="/weapons">
                    Armas
                  </Link>
                </li>
                <li>
                  <Link onClick={handleRemoveClick} to="/classes">
                    Classes
                  </Link>
                </li>
                <li>
                  <Link onClick={handleRemoveClick} to="/divinities">
                    Divindades
                  </Link>
                </li>
                <li>
                  <Link onClick={handleRemoveClick} to="/equipments">
                    Equipamentos
                  </Link>
                </li>
                <li>
                  <Link onClick={handleRemoveClick} to="/races">
                    Raças
                  </Link>
                </li>
                <li>
                  <Link onClick={handleRemoveClick} to="/portraits">
                    Retratos
                  </Link>
                </li>
                <li>
                  <Link onClick={handleRemoveClick} to="/tokens">
                    Tokens
                  </Link>
                </li>
                <li>
                  <Link onClick={handleRemoveClick} to="/campaigns">
                    Campanhas
                  </Link>
                </li>
              </ul>
            </Dropmenu>
          </li>

          <li>
            {/* eslint-disable-next-line */}
            <strong onClick={handleChaClick}>PERSONAGENS</strong>
            <Dropmenu rel={cha ? 1 : 0} perfil={perfil}>
              <ul>
                <li>
                  <Link onClick={handleRemoveClick} to="/charactercreate">
                    Novo Personagem
                  </Link>
                </li>
                <li>
                  <Link onClick={handleRemoveClick} to="/characters">
                    Listar Personagens
                  </Link>
                </li>
                {/* <li>
                  <Link onClick={handleRemoveClick} to="/characterview">
                    Ver Ficha
                  </Link>
                </li> */}
              </ul>
            </Dropmenu>
          </li>

          <Link onClick={handleRemoveClick} to="/combat">
            COMBATE
          </Link>

          <Link onClick={handleRemoveClick} to="/notes">
            NOTAS
          </Link>

          {/* <Link onClick={handleRemoveClick} to="/gmtools">
            GM
          </Link> */}
          {/* <Link onClick={handleRemoveClick} to="/map">
            MAP
          </Link> */}
        </ul>
      </Container>
    </Navigation>
  )
}
