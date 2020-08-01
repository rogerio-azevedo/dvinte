import React from 'react'
import PropTypes, { object } from 'prop-types'

import { Container, InputLarge, InputMed } from './styles'

export default function CharArmor({ armors, size }) {
  return (
    <Container>
      <ul>
        {armors.map(item => (
          <li key={Math.random()}>
            <div>
              <label htmlFor="inputResist">Nome</label>
              <InputLarge readOnly defaultValue={item.name} />
            </div>
            <div>
              <label htmlFor="inputResist">Tipo</label>
              <input readOnly defaultValue={item.type} />
            </div>

            <div>
              <label htmlFor="inputResist">Bônus</label>
              <input readOnly defaultValue={item.bonus} />
            </div>
            <div>
              <label htmlFor="inputResist">Encant</label>
              <input readOnly defaultValue={item.defense} />
            </div>
            <div>
              <label htmlFor="inputResist">Dest Max</label>
              <input readOnly defaultValue={item.dexterity} />
            </div>
            <div>
              <label htmlFor="inputResist">Penalidade</label>
              <input readOnly defaultValue={item.penalty} />
            </div>
            <div>
              <label htmlFor="inputResist">Deslocamento</label>
              <input
                readOnly
                defaultValue={
                  size === 'MÉDIO' ? item.displacement_m : item.displacement_s
                }
              />
            </div>
            <div>
              <label htmlFor="inputResist">Peso</label>
              <input readOnly defaultValue={`${item.weight} kg`} />
            </div>
            <div>
              <label htmlFor="inputResist">Preço</label>
              <InputMed readOnly defaultValue={`${item.price} PO`} />
            </div>
          </li>
        ))}
      </ul>
    </Container>
  )
}

CharArmor.propTypes = {
  armors: PropTypes.arrayOf(object).isRequired,
  size: PropTypes.string.isRequired,
}
