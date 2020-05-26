import React from 'react'

import { Container, ClassInput, ClassValueInput } from './styles'

export default function CharClass({ classes }) {
  const classLength = classes.length
  const len1 = classes[0]
  const len2 = classes[1]
  const len3 = classes[2]
  const len4 = classes[3]

  return (
    <Container>
      <ul>
        <li>
          <ClassInput defaultValue={len1.name} />
          <ClassValueInput defaultValue={len1.level} />
        </li>
        <li>
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
        </li>
      </ul>
    </Container>
  )
}
