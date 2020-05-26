import React from 'react'

import { Container, ClassInput, ClassValueInput } from './styles'

export default function CharClass({ classes, loading }) {
  return (
    <Container>
      <ul>
        {!loading &&
          classes.length > 0 &&
          classes.map((item, index) => (
            // eslint-disable-next-line
            <li key={index}>
              <ClassInput defaultValue={item.name} />
              <ClassValueInput defaultValue={item.level} />
            </li>
          ))}
      </ul>
    </Container>
  )
}
