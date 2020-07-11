import React, { useState } from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
import { FaTimes } from 'react-icons/fa/'

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

export default function ModalCharacterStatus({ charStatus }) {
  const fort = charStatus && charStatus.fortitude
  const ref = charStatus && charStatus.reflex
  const wil = charStatus && charStatus.will
  const init = charStatus && charStatus.charInit
  const mel = charStatus && charStatus.melee
  const ran = charStatus && charStatus.ranged
  const ca = charStatus && charStatus.totalCa
  const heal = charStatus && charStatus.health
  const healNow = charStatus && charStatus.healthNow

  const [modalIsOpen, setIsOpen] = useState(false)
  function openModal() {
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
        Status
      </Styles.Button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Styles.HeaderContainer>
          <h2>Meus Atributos</h2>
          <FaTimes
            onClick={closeModal}
            color="red"
            size={20}
            cursor="pointer"
          />
        </Styles.HeaderContainer>

        <Styles.StatusContainer>
          <Styles.GroupStatus>
            <Styles.Resume>
              <label htmlFor="inputResist">Fortitude</label>
              <Styles.InputResume readOnly defaultValue={fort} />
            </Styles.Resume>
            <Styles.Resume>
              <label htmlFor="inputResist">Reflexos</label>
              <Styles.InputResume readOnly defaultValue={ref} />
            </Styles.Resume>
            <Styles.Resume>
              <label htmlFor="inputResist">Vontade</label>
              <Styles.InputResume readOnly defaultValue={wil} />
            </Styles.Resume>
            <Styles.Resume>
              <label htmlFor="inputResist">Iniciativa</label>
              <Styles.InputResume readOnly defaultValue={init} />
            </Styles.Resume>
          </Styles.GroupStatus>

          <Styles.GroupStatus>
            <Styles.Resume>
              <label htmlFor="inputResist">CA</label>
              <Styles.InputResume readOnly defaultValue={ca} />
            </Styles.Resume>
            <Styles.Resume>
              <label htmlFor="inputResist">Melee</label>
              <Styles.InputResume readOnly defaultValue={mel} />
            </Styles.Resume>
            <Styles.Resume>
              <label htmlFor="inputResist">Ranged</label>
              <Styles.InputResume readOnly defaultValue={ran} />
            </Styles.Resume>
            <Styles.Resume>
              <label htmlFor="inputResist">PV</label>
              <Styles.InputResume readOnly defaultValue={heal} />
            </Styles.Resume>
            <Styles.Resume>
              <label htmlFor="inputResist">PV Atual</label>
              <Styles.InputResume readOnly defaultValue={healNow} />
            </Styles.Resume>
          </Styles.GroupStatus>
        </Styles.StatusContainer>
      </Modal>
    </Styles.Container>
  )
}

ModalCharacterStatus.propTypes = {
  charStatus: PropTypes.shape({
    fortitude: PropTypes.number,
    reflex: PropTypes.number,
    will: PropTypes.number,
    charInit: PropTypes.number,
    melee: PropTypes.number,
    ranged: PropTypes.number,
    totalCa: PropTypes.number,
    health: PropTypes.number,
    healthNow: PropTypes.number,
  }),
}

ModalCharacterStatus.defaultProps = {
  charStatus: {},
}
