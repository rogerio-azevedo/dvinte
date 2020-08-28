import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import Modal from 'react-modal'
import { FaTimes } from 'react-icons/fa/'
import api from '~/services/api'

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

export default function ModalDamages() {
  const profile = useSelector(state => state.user.profile)

  const [modalIsOpen, setIsOpen] = useState(false)
  const [damages, setDamages] = useState([])

  async function loadDamage(type) {
    const response = await api.get('/damages', {
      params: {
        type: type,
      },
    })

    setDamages(response.data)
  }

  function openModal() {
    loadDamage()
    setIsOpen(true)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false)
  }

  function handleStartSession() {
    api.post('combats', {
      id: 0,
      user_id: profile.id,
      user: profile.name,
      message: 'Sessão Iniciada!!!',
      result: 0,
      type: 0,
    })
  }

  function handleStartCombat() {
    api.post('combats', {
      id: 0,
      user_id: profile.id,
      user: profile.name,
      message: 'Combate Iniciado!!!',
      result: 0,
      type: 8,
    })
  }

  return (
    <Styles.Container>
      <Styles.Button type="button" onClick={openModal}>
        Damages
      </Styles.Button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Styles.HeaderContainer>
          <h2>Dano total por Usuário</h2>
          <FaTimes
            onClick={closeModal}
            color="red"
            size={20}
            cursor="pointer"
          />
        </Styles.HeaderContainer>

        <Styles.ButtonsContainer>
          <Styles.Button type="button" onClick={() => loadDamage('reload')}>
            Recarregar
          </Styles.Button>
          <Styles.Button type="button" onClick={() => loadDamage('session')}>
            Aventura
          </Styles.Button>
          <Styles.Button type="button" onClick={() => loadDamage('combat')}>
            Combate
          </Styles.Button>
        </Styles.ButtonsContainer>

        <Styles.InitContainer>
          <Styles.InitBoardContainer>
            <ul>
              {damages
                ?.sort((a, b) => b.damage - a.damage)
                .map(item => (
                  <li key={Math.random()}>
                    <Styles.InitUser readOnly defaultValue={item.user} />
                    <Styles.InitValue readOnly defaultValue={item.damage} />
                  </li>
                ))}
            </ul>
          </Styles.InitBoardContainer>
        </Styles.InitContainer>
        <Styles.ResetButtonsContainer>
          <Styles.ButtonLarge type="button" onClick={handleStartSession}>
            Inicia Aventura
          </Styles.ButtonLarge>
          <Styles.ButtonLarge type="button" onClick={handleStartCombat}>
            Inicia Combate
          </Styles.ButtonLarge>
        </Styles.ResetButtonsContainer>
      </Modal>
    </Styles.Container>
  )
}
