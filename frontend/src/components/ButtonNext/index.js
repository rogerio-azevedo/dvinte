import React from 'react'
import { MdChevronRight } from 'react-icons/md'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { ArrowRigth } from './styles'

export default function ButtonNext({ linkto, display, handleSave }) {
  return (
    <ArrowRigth display={display}>
      <Link to={linkto}>
        <MdChevronRight
          size={100}
          color={display === 'show' ? '#8e0e00' : '#fff'}
          onClick={handleSave}
        />
      </Link>
    </ArrowRigth>
  )
}

ButtonNext.propTypes = {
  linkto: PropTypes.string.isRequired,
  display: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired,
}
