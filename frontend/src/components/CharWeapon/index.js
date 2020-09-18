import React from 'react'
import PropTypes, { object } from 'prop-types'

import { Container, InputLarge, InputMed, InputShort } from './styles'

export default function CharWeapon({ weapons, size }) {
  return (
    <Container>
      <ul>
        {weapons?.map(item => (
          <li key={Math.random()}>
            <div>
              <label htmlFor="inputResist">Nome</label>
              <InputLarge readOnly defaultValue={item.name} />
            </div>
            <div>
              <label htmlFor="inputResist">Qtde</label>
              <InputShort
                readOnly
                defaultValue={
                  size === 'MÉDIO' ? item.multiplier_m : item.multiplier_s
                }
              />
            </div>
            <div>
              <label htmlFor="inputResist">Dado</label>
              <InputShort
                readOnly
                defaultValue={`d${
                  size === 'MÉDIO' ? item.dice_m : item.dice_s
                }`}
              />
            </div>
            <div>
              <label htmlFor="inputResist">Crítico</label>
              <InputMed
                readOnly
                defaultValue={`${
                  item.crit_from_mod > 0 ? item.crit_from_mod : item.crit_from
                }-20 / ${item.crit_mod > 0 ? item.crit_mod : item.critical}x`}
              />
            </div>
            <div>
              <label htmlFor="inputResist">Elemento</label>
              <InputShort readOnly defaultValue={`d${item.element}`} />
            </div>
            <div>
              <label htmlFor="inputResist">Alcance</label>
              <InputShort readOnly defaultValue={item.range} />
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
              <label htmlFor="inputResist">Peso</label>
              <InputShort readOnly defaultValue={`${item.weight} kg`} />
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

CharWeapon.propTypes = {
  weapons: PropTypes.arrayOf(object).isRequired,
  size: PropTypes.string.isRequired,
}
