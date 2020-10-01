import React, { useEffect } from 'react'
import PropTypes, { object } from 'prop-types'
import { FaTimes } from 'react-icons/fa'
import api from '~/services/api'

import { Container, InputLarge, InputMed, InputShort } from './styles'

export default function CharEquipment({ equipments, char }) {
  async function handleRemove(item) {
    await api.delete(`characterequipments/${item.id}`, {
      params: {
        char: char,
      },
    })
  }

  useEffect(() => {}, [equipments])

  return (
    <Container>
      <ul>
        {equipments?.map(item => (
          <li key={Math.random()}>
            <div>
              <label htmlFor="inputEquip">Nome</label>
              <InputLarge readOnly defaultValue={item.name} />
            </div>
            <div>
              <label htmlFor="inputEquip">Força</label>
              <InputShort readOnly defaultValue={item.str_temp} />
            </div>
            <div>
              <label htmlFor="inputEquip">Destreza</label>
              <InputShort readOnly defaultValue={item.dex_temp} />
            </div>
            <div>
              <label htmlFor="inputEquip">Constituição</label>
              <InputShort readOnly defaultValue={item.con_temp} />
            </div>
            <div>
              <label htmlFor="inputEquip">Inteligência</label>
              <InputShort readOnly defaultValue={item.int_temp} />
            </div>
            <div>
              <label htmlFor="inputEquip">Sabedoria</label>
              <InputShort readOnly defaultValue={item.wis_temp} />
            </div>
            <div>
              <label htmlFor="inputEquip">Carisma</label>
              <InputShort readOnly defaultValue={item.cha_temp} />
            </div>

            <div>
              <label htmlFor="inputResist">Peso</label>
              <InputShort readOnly defaultValue={`${item.weight} kg`} />
            </div>
            <div>
              <label htmlFor="inputResist">Preço</label>
              <InputMed readOnly defaultValue={`${item.price} PO`} />
            </div>
            <div>
              <label htmlFor="inputResist">Remover</label>
              <span>
                <FaTimes
                  size={20}
                  color="#8e0e00"
                  cursor="pointer"
                  onClick={() => handleRemove(item)}
                />
              </span>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  )
}

CharEquipment.propTypes = {
  equipments: PropTypes.arrayOf(object).isRequired,
  char: PropTypes.number.isRequired,
}
