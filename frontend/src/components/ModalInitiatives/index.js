import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import { FaTimes } from 'react-icons/fa/'
import api from '~/services/api'
import { connect, socket } from '~/services/socket'

import * as Styles from './styles'

const customStyles = {
  content: {
    width: '550px',
    height: '550px',
    top: '45%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

Modal.setAppElement('#root')

export default function ModalInitiatives({ from, profile, charInit }) {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [initiatives, setInitiatives] = useState([])

  async function loadInitiative() {
    const response = await api.get('/initiatives')

    setInitiatives(response.data)
  }

  function openModal() {
    loadInitiative()
    setIsOpen(true)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false)
  }

  async function handleInitiative() {
    const dext = charInit

    const dice = Math.floor(Math.random() * 20) + 1

    const initTotal = dext + dice

    const rolled = `Rolou iniciativa d20: ${dice} + ${dext} de destreza, com resultado: ${initTotal}`

    api.post('combats', {
      id: from,
      user_id: profile.id,
      user: profile.name,
      message: rolled,
      result: initTotal,
      type: 8,
    })

    api.post('initiatives', {
      user_id: profile.id,
      user: profile.name,
      initiative: initTotal,
    })
  }

  useEffect(() => {
    const handleNewInit = newInitiative =>
      setInitiatives([...initiatives, newInitiative])

    socket.on('init.message', handleNewInit)

    return () => socket.off('init.message', handleNewInit)
  }, [initiatives])

  async function clearInitiatives() {
    await api.delete('initiatives')

    setInitiatives([])
  }

  useEffect(() => {
    connect()
  }, []) // eslint-disable-line

  return (
    <Styles.Container>
      <Styles.Button type="button" onClick={openModal}>
        Iniciativa
      </Styles.Button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Styles.HeaderContainer>
          <h2>Iniciativas</h2>
          <FaTimes
            onClick={closeModal}
            color="red"
            size={20}
            cursor="pointer"
          />
        </Styles.HeaderContainer>

        <Styles.ButtonsContainer>
          <Styles.Button type="button" onClick={handleInitiative}>
            Iniciativa
          </Styles.Button>
          <Styles.Button type="button" onClick={clearInitiatives}>
            Limpar
          </Styles.Button>
          <Styles.Button type="button" onClick={loadInitiative}>
            Recarregar
          </Styles.Button>
        </Styles.ButtonsContainer>

        <Styles.InitContainer>
          <Styles.InitBoardContainer>
            <ul>
              {initiatives
                ?.sort((a, b) => b.initiative - a.initiative)
                .map(item => (
                  <li key={Math.random()}>
                    <Styles.InitUser readOnly defaultValue={item.user} />
                    <Styles.InitValue readOnly defaultValue={item.initiative} />
                  </li>
                ))}
            </ul>
          </Styles.InitBoardContainer>
        </Styles.InitContainer>
      </Modal>
    </Styles.Container>
  )
}

ModalInitiatives.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),

  charInit: PropTypes.number,
  from: PropTypes.number,
}

ModalInitiatives.defaultProps = {
  profile: {},
  charInit: 0,
  from: 0,
}
