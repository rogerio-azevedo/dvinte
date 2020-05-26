import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Container, ClassInput, ClassValueInput } from './styles'

export default function CharClass({ classes }) {
  const [newClass, setNewClass] = useState({})
  const [newClass2, setNewClass2] = useState({})
  const [newClass3, setNewClass3] = useState({})
  const [newClass4, setNewClass4] = useState({})

  async function loadChass() {
    setNewClass(classes && classes[0])
    setNewClass2(classes && classes[1])
    setNewClass3(classes && classes[2])
    setNewClass4(classes && classes[3])
  }

  useEffect(() => {
    loadChass()
  }, []) // eslint-disable-line

  return (
    <Container>
      <ul>
        <li>
          <ClassInput defaultValue={newClass && newClass.name} />
          <ClassValueInput defaultValue={newClass && newClass.level} />
        </li>
        <li>
          <ClassInput defaultValue={newClass2 && newClass2.name} />
          <ClassValueInput defaultValue={newClass2 && newClass2.level} />
        </li>
        <li>
          <ClassInput defaultValue={newClass3 && newClass3.name} />
          <ClassValueInput defaultValue={newClass3 && newClass3.level} />
        </li>
        <li>
          <ClassInput defaultValue={newClass4 && newClass4.name} />
          <ClassValueInput defaultValue={newClass4 && newClass4.level} />
        </li>
      </ul>
    </Container>
  )
}
