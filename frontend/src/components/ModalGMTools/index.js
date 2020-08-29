import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Modal from 'react-modal'
import { FaTimes, FaCog } from 'react-icons/fa/'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Switch } from 'antd'

import api from '~/services/api'

import * as Styles from './styles'

const customStyles = {
  content: {
    width: '550px',
    height: '350px',
    top: '45%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

Modal.setAppElement('#root')

export default function ModalGMTolls() {
  const profile = useSelector(state => state.user.profile)
  const { handleSubmit, register, setValue } = useForm()
  const [modalIsOpen, setIsOpen] = useState(false)
  const [size, setSize] = useState(60)

  useEffect(() => {
    register({ name: 'grid' })
    register({ name: 'fog' })
    register({ name: 'owner' })
  }, [register])

  const onSubmit = (data, e) => {
    async function saveData() {
      await api.post('maps', data)
      e.target.reset()
      toast.success('Arma vinculada com sucesso!')
    }
    saveData()

    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
    setValue('owner', profile.id)
    setValue('grid', true)
    setValue('fog', false)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false)
  }

  function handleGrid(checked) {
    if (checked === true) {
      setValue('grid', checked)
    } else {
      setValue('grid', false)
    }
  }

  function handleFog(checked) {
    if (checked === true) {
      setValue('fog', checked)
    } else {
      setValue('fog', false)
    }
  }

  return (
    <Styles.Container>
      <FaCog size={30} onClick={openModal} cursor="pointer" />
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Styles.HeaderContainer>
          <h2>Cadastro de Mapa</h2>
          <FaTimes
            onClick={closeModal}
            color="red"
            size={20}
            cursor="pointer"
          />
        </Styles.HeaderContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Styles.InputContainer>
            <div>
              <label htmlFor="url">Endereço</label>
              <Styles.InputLarge
                name="url"
                ref={register({ required: true })}
              />
            </div>
          </Styles.InputContainer>

          <Styles.InputContainer>
            <div>
              <label htmlFor="height">Altura</label>
              <Styles.InputMed
                name="height"
                ref={register({ required: true })}
              />
            </div>
            <div>
              <label htmlFor="width">Largura</label>
              <Styles.InputMed
                name="width"
                ref={register({ required: true })}
              />
            </div>

            <div>
              <label htmlFor="grid">Grid</label>
              <div style={{ marginTop: '18px' }}>
                <Switch
                  name="grid"
                  defaultChecked={true}
                  onChange={handleGrid}
                />
              </div>
            </div>

            <div>
              <label htmlFor="fog">Fog</label>
              <div style={{ marginTop: '18px' }}>
                <Switch
                  name="fog"
                  defaultChecked={false}
                  onChange={handleFog}
                />
              </div>
            </div>

            <div>
              <label htmlFor="fog">Tipo</label>
              <Styles.SelectMed name="type" ref={register({ required: true })}>
                <option value={2}>Batalha</option>
                <option value={1}>Mundo</option>
              </Styles.SelectMed>
            </div>
          </Styles.InputContainer>
          <Styles.InputContainer>
            <input
              value={size}
              onChange={e => {
                setSize(parseInt(e.target.value))
              }}
              type="range"
              step="3"
              min="3"
              max="200"
            />
          </Styles.InputContainer>

          <Styles.ButtonsContainer>
            <Styles.Button type="submit">Cadastrar</Styles.Button>
          </Styles.ButtonsContainer>
        </form>
      </Modal>
    </Styles.Container>
  )
}
