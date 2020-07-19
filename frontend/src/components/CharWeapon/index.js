import React from 'react'
import PropTypes, { object } from 'prop-types'

import { Container, InputLarge, InputMed } from './styles'

export default function CharWeapon({ weapons }) {
  return (
    <Container>
      <ul>
        {weapons.map(item => (
          <li key={Math.random()}>
            <div>
              <label htmlFor="inputResist">Nome</label>
              <InputLarge readOnly defaultValue={item.name} />
            </div>
            <div>
              <label htmlFor="inputResist">Qtde</label>
              <input readOnly defaultValue={item.multiplier} />
            </div>
            <div>
              <label htmlFor="inputResist">Dado</label>
              <input readOnly defaultValue={`d${item.dice}`} />
            </div>
            <div>
              <label htmlFor="inputResist">Crítico</label>
              <InputMed readOnly defaultValue={item.critical} />
            </div>
            <div>
              <label htmlFor="inputResist">Alcance</label>
              <input readOnly defaultValue={item.range} />
            </div>
            <div>
              <label htmlFor="inputResist">Tipo</label>
              <InputMed readOnly defaultValue={item.type} />
            </div>
            <div>
              <label htmlFor="inputResist">Material</label>
              <InputMed readOnly defaultValue={item.material} />
            </div>
            <div>
              <label htmlFor="inputResist">Mágico</label>
              <InputMed readOnly defaultValue={item.magic} />
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

CharWeapon.propTypes = {
  weapons: PropTypes.arrayOf(object).isRequired,
}
