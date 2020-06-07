import React from 'react'
import PropTypes, { object } from 'prop-types'

import {
  Container,
  InputResitContainer,
  DefenseMainLabel,
  InputDefense,
} from './styles'

export default function CharCa({ armors, dextMod }) {
  const shield = armors
    .filter(t => t.type === 2)
    .reduce((acc, val) => {
      return acc + val.bonus
    }, 0)

  const armor = armors
    .filter(t => t.type === 1)
    .reduce((acc, val) => {
      return acc + val.bonus
    }, 0)

  const maxDext = armors
    .filter(t => t.type === 1)
    .reduce((acc, val) => {
      return acc + val.dexterity
    }, 0)

  function calcDext(value) {
    let dextBonus = 0

    if (value <= maxDext) {
      dextBonus = dextMod
    } else if (!maxDext || maxDext === 0) {
      dextBonus = dextMod
    } else {
      dextBonus = maxDext
    }

    return dextBonus
  }

  const bonusDext = calcDext(dextMod)

  const totalCa = 10 + shield + armor + bonusDext

  return (
    <Container>
      <InputResitContainer>
        <div>
          <DefenseMainLabel readOnly defaultValue="CA" />
        </div>

        <div>
          <label htmlFor="inputResist">total</label>
          <InputDefense readOnly defaultValue={totalCa} />
        </div>
        <div>
          <label htmlFor="inputResist">armad</label>
          <InputDefense readOnly defaultValue={armor} />
        </div>
        <div>
          <label htmlFor="inputResist">escudo</label>
          <InputDefense readOnly defaultValue={shield} />
        </div>
        <div>
          <label htmlFor="inputResist">dest</label>
          <InputDefense readOnly defaultValue={bonusDext} />
        </div>
        <div>
          <label htmlFor="inputResist">tam</label>
          <InputDefense readOnly defaultValue="" />
        </div>
        <div>
          <label htmlFor="inputResist">arm nat</label>
          <InputDefense readOnly defaultValue="" />
        </div>
        <div>
          <label htmlFor="inputResist">deflex</label>
          <InputDefense readOnly defaultValue="" />
        </div>
        <div>
          <label htmlFor="inputResist">outros</label>
          <InputDefense readOnly defaultValue="" />
        </div>
      </InputResitContainer>
    </Container>
  )
}

CharCa.propTypes = {
  armors: PropTypes.arrayOf(object).isRequired,
  dextMod: PropTypes.number.isRequired,
}
