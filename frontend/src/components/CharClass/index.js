import React, { useState, useEffect } from 'react'
import PropTypes, { object } from 'prop-types'

import { Container, ClassInput, ClassValueInput } from './styles'

export default function CharClass({ classes }) {
  const [load, setLoad] = useState(true)
  const [classArray, setClassArray] = useState([])

  async function loadClass() {
    setClassArray(classes)
  }
  useEffect(() => {
    loadClass()
    setLoad(false)
  }, []) // eslint-disable-line

  return (
    <Container>
      <ul>
        <li>
          {!load && (
            <ClassInput
              defaultValue={!load && classArray && classArray[0].name}
            />
          )}
          {!load && (
            <ClassValueInput
              defaultValue={!load && classArray && classArray[0].level}
            />
          )}
        </li>
        <li>
          {!load && (
            <ClassInput
              defaultValue={!load && classArray && classArray[1].name}
            />
          )}
          {!load && (
            <ClassValueInput
              defaultValue={!load && classArray && classArray[1].level}
            />
          )}
        </li>
        <li>
          {!load && (
            <ClassInput
              defaultValue={!load && classArray && classArray[2].name}
            />
          )}
          {!load && (
            <ClassValueInput
              defaultValue={!load && classArray && classArray[2].level}
            />
          )}
        </li>
        <li>
          {!load && (
            <ClassInput
              defaultValue={!load && classArray && classArray[3].name}
            />
          )}
          {!load && (
            <ClassValueInput
              defaultValue={!load && classArray && classArray[3].level}
            />
          )}
        </li>
      </ul>
    </Container>
  )
}

CharClass.propTypes = {
  classes: PropTypes.arrayOf(object).isRequired,
}
