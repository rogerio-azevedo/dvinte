import React from 'react'
import PropTypes, { object } from 'prop-types'

import { Container, InputLarge, InputMed } from './styles'

export default function CharArmor({ armors }) {
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
              <label htmlFor="inputResist">Bonus</label>
              <input readOnly defaultValue={item.bonus} />
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
              <input readOnly defaultValue={item.displacement} />
            </div>
            <div>
              <label htmlFor="inputResist">Peso</label>
              <input readOnly defaultValue={item.weight} />
            </div>
            <div>
              <label htmlFor="inputResist">Especial</label>
              <InputMed readOnly defaultValue={item.special} />
            </div>
            <div>
              <label htmlFor="inputResist">Preço</label>
              <InputMed readOnly defaultValue={item.price} />
            </div>
          </li>
        ))}
      </ul>
    </Container>
  )
}

CharArmor.propTypes = {
  armors: PropTypes.arrayOf(object).isRequired,
}
