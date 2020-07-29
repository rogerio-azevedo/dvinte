import React from 'react'
import { MdChevronLeft } from 'react-icons/md'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { ArrowLeft } from './styles'

export default function ButtonPrev({ linkto, display }) {
  return (
    <ArrowLeft display={display}>
      <Link to={linkto}>
        <MdChevronLeft
          size={100}
          color={display === 'show' ? '#8e0e00' : '#fff'}
        />
      </Link>
    </ArrowLeft>
  )
}

ButtonPrev.propTypes = {
  linkto: PropTypes.string.isRequired,
  display: PropTypes.string.isRequired,
}
