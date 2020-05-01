import React from 'react'
import PropTypes from 'prop-types'

import { Container } from './styles'

export default function Button({ TextButton, loading, perfil }) {
  return (
    <Container loading={loading} perfil={perfil}>
      <button type="submit">{TextButton}</button>
    </Container>
  )
}

Button.propTypes = {
  TextButton: PropTypes.string,
  loading: PropTypes.number,
  perfil: PropTypes.number,
}

Button.defaultProps = {
  TextButton: undefined,
  loading: 0,
  perfil: 0,
}
