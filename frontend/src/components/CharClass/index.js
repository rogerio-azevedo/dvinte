import React, { useState, useEffect } from 'react'

import { Container, ClassInput, ClassValueInput } from './styles'

export default function CharClass({ classes, loading }) {
  const [newClass, setNewClass] = useState()

  async function loadChass() {
    setNewClass(classes && classes[0])
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
        {/* <li>
          <ClassInput defaultValue={len2.name} />
          <ClassValueInput defaultValue={len2.level} />
        </li>
        <li>
          <ClassInput defaultValue={len3.name} />
          <ClassValueInput defaultValue={len3.level} />
        </li>
        <li>
          <ClassInput defaultValue={len4.name} />
          <ClassValueInput defaultValue={len4.level} />
        </li> */}
      </ul>
    </Container>
  )
}
