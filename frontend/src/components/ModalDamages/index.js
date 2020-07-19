import React, { useState } from 'react'
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
  const [modalIsOpen, setIsOpen] = useState(false)
  const [damages, setDamages] = useState([])

  async function loadDamage() {
    const response = await api.get('/damages')

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

  return (
    <Styles.Container>
      <Styles.Button type="button" onClick={openModal}>
        Damage
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
          <Styles.Button type="button" onClick={loadDamage}>
            Recarregar
          </Styles.Button>
        </Styles.ButtonsContainer>

        <Styles.InitContainer>
          <Styles.InitBoardContainer>
            <ul>
              {damages &&
                damages
                  // .sort((a, b) => b.initiative - a.initiative)
                  .map(item => (
                    <li key={Math.random()}>
                      <Styles.InitUser readOnly defaultValue={item.user} />
                      <Styles.InitValue readOnly defaultValue={item.damage} />
                    </li>
                  ))}
            </ul>
          </Styles.InitBoardContainer>
        </Styles.InitContainer>
      </Modal>
    </Styles.Container>
  )
}
