import React from 'react'
import PropTypes from 'prop-types'

import { Container } from './styles'

export default function ButtonLoad({
  handleLoadData,
  TextButton,
  loading,
  perfil,
}) {
  return (
    <Container loading={loading} perfil={perfil}>
      <button type="button" onClick={handleLoadData}>
        {TextButton}
      </button>
    </Container>
  )
}

ButtonLoad.propTypes = {
  handleLoadData: PropTypes.func,
  TextButton: PropTypes.string,
  loading: PropTypes.number,
  perfil: PropTypes.number,
}

ButtonLoad.defaultProps = {
  handleLoadData: PropTypes.func,
  TextButton: undefined,
  loading: 0,
  perfil: 0,
}
