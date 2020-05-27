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
              <InputLarge defaultValue={item.name} />
            </div>
            <div>
              <label htmlFor="inputResist">Qtde</label>
              <input defaultValue={item.multiplier} />
            </div>
            <div>
              <label htmlFor="inputResist">Dados</label>
              <input defaultValue={item.dice} />
            </div>
            <div>
              <label htmlFor="inputResist">Crítico</label>
              <InputMed defaultValue={item.critical} />
            </div>
            <div>
              <label htmlFor="inputResist">Alcance</label>
              <input defaultValue={item.range} />
            </div>
            <div>
              <label htmlFor="inputResist">Tipo</label>
              <InputMed defaultValue={item.type} />
            </div>
            <div>
              <label htmlFor="inputResist">Material</label>
              <InputMed defaultValue={item.material} />
            </div>
            <div>
              <label htmlFor="inputResist">Mágico</label>
              <input defaultValue={item.magic} />
            </div>
            <div>
              <label htmlFor="inputResist">Peso</label>
              <input defaultValue={item.weight} />
            </div>
            <div>
              <label htmlFor="inputResist">Especial</label>
              <InputMed defaultValue={item.special} />
            </div>
            <div>
              <label htmlFor="inputResist">Preço</label>
              <InputMed defaultValue={item.price} />
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
