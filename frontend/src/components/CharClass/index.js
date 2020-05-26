import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Container, ClassInput, ClassValueInput } from './styles'

export default function CharClass({ classes, loading }) {
  const [classArray, setClassArray] = useState(!loading && classes)

  return (
    <Container>
      <ul>
        <li>
          <ClassInput defaultValue={classArray && classArray[0].name} />
          <ClassValueInput defaultValue={classArray && classArray[0].level} />
        </li>
        <li>
          <ClassInput defaultValue={classArray && classArray[1].name} />
          <ClassValueInput defaultValue={classArray && classArray[1].level} />
        </li>
        <li>
          <ClassInput defaultValue={classArray && classArray[2].name} />
          <ClassValueInput defaultValue={classArray && classArray[2].level} />
        </li>
        <li>
          <ClassInput defaultValue={classArray && classArray[3].name} />
          <ClassValueInput defaultValue={classArray && classArray[3].level} />
        </li>
      </ul>
    </Container>
  )
}
