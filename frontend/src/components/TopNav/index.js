import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import logoKiper from '~/assets/logo_black.svg'
import logoPorter from '~/assets/logo_red.svg'

import { Navigation, Container, Dropmenu, Logo } from './styles'

export default function TopNav() {
  const perfil = true // useSelector(state => state.user.profile.partner.is_porter);

  const container = React.createRef()

  // const [dig, setDig] = useState(false)
  // const [rel, setRel] = useState(false)
  const [cad, setCad] = useState(false)
  // const [ate, setAte] = useState(false)

  // function handleDiagClick() {
  //   setDig(!dig)
  //   setRel(false)
  //   setCad(false)
  //   setAte(false)
  // }

  // function handleRelClick() {
  //   setRel(!rel)
  //   setDig(false)
  //   setCad(false)
  //   setAte(false)
  // }

  function handleCadClick() {
    setCad(!cad)
    // setDig(false)
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
    // setAte(false)
  }

  // eslint-disable-next-line
  function handleClickOutside(event) {
    if (container.current && !container.current.contains(event.target)) {
      // setDig(false)
      // setRel(false)
      setCad(false)
      // setAte(false)
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
                  <Link onClick={handleRemoveClick} to="/races">
                    Raças
                  </Link>
                </li>
              </ul>
            </Dropmenu>
          </li>

          {/* <li>
            <strong onClick={handleDiagClick}>CADASTROS</strong>

            <Dropmenu dig={dig ? 1 : 0} perfil={perfil}>
              <ul>
                <li>
                  <Link onClick={handleRemoveClick} to="/eventodia">
                    Alinhamentos
                  </Link>
                </li>
                <li>
                  <Link onClick={handleRemoveClick} to="/relacessos">
                    Classes
                  </Link>
                </li>
                <li>
                  <Link onClick={handleRemoveClick} to="/relacessos">
                    Divindades
                  </Link>
                </li>
                <li>
                  <Link onClick={handleRemoveClick} to="/atendconvite">
                    Raças
                  </Link>
                </li>
              </ul>
            </Dropmenu>
          </li> */}

          {/* <li>
            <strong onClick={handleAteClick}>ATENDIMENTO</strong>
            <Dropmenu rel={ate ? 1 : 0} perfil={perfil}>
              <ul>
                <li>
                  <Link onClick={handleRemoveClick} to="/maiorespera">
                    Maior Tempo Espera
                  </Link>
                </li>
                <li>
                  <Link onClick={handleRemoveClick} to="/relacessos">
                    REL ACESSOS
                  </Link>
                </li>
                <li>
                  <Link onClick={handleRemoveClick} to="/relacessos">
                    REL ACESSOS
                  </Link>
                </li>
              </ul>
            </Dropmenu>
          </li> */}

          {/* <li>
            <strong onClick={handleRelClick}>RELATÓRIOS</strong>
            <Dropmenu rel={rel ? 1 : 0} perfil={perfil}>
              <ul>
                <li>
                  <Link onClick={handleRemoveClick} to="/relacessos">
                    Relatório de Acessos
                  </Link>
                </li>
                <li>
                  <Link onClick={handleRemoveClick} to="/relacessos">
                    REL ACESSOS
                  </Link>
                </li>
                <li>
                  <Link onClick={handleRemoveClick} to="/relacessos">
                    REL ACESSOS
                  </Link>
                </li>
              </ul>
            </Dropmenu>
          </li> */}
        </ul>
      </Container>
    </Navigation>
  )
}
