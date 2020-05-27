import React from 'react'
import PropTypes, { object } from 'prop-types'

import { Container, ClassInput, ClassValueInput } from './styles'

export default function CharClass({ classes }) {
  return (
    <Container>
      <ul>
        <li>
          <ClassInput defaultValue={classes && classes[0].name} />
          <ClassValueInput defaultValue={classes && classes[0].level} />
        </li>
        <li>
          <ClassInput defaultValue={classes && classes[1].name} />
          <ClassValueInput defaultValue={classes && classes[1].level} />
        </li>
        <li>
          <ClassInput defaultValue={classes && classes[2].name} />
          <ClassValueInput defaultValue={classes && classes[2].level} />
        </li>
        <li>
          <ClassInput defaultValue={classes && classes[3].name} />

          <ClassValueInput defaultValue={classes && classes[3].level} />
        </li>
      </ul>
    </Container>
  )
}

CharClass.propTypes = {
  classes: PropTypes.arrayOf(object).isRequired,
}
