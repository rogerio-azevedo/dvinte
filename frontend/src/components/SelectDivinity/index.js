import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'
import api from '~/services/api'

export default function SelectDivinity({ changeDivinity, defaultValue }) {
  const [divinity, setDivinity] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const response = await api.get('divinities')

      const align = response.data.map(m => ({
        value: m.id,
        label: m.name.toUpperCase(),
      }))

      setDivinity(align)
      setLoading(false)
    }
    load()
  }, [])

  const customStyles = {
    input: styles => {
      return {
        ...styles,
        height: '30px',
        minHeight: '30px',
      }
    },
  }

  return (
    <div style={{ width: '250px', marginRight: '15px' }}>
      <Select
        value={divinity.filter(option => option.value === defaultValue)}
        styles={customStyles}
        maxMenuHeight={250}
        placeholder="ESCOLHA A DIVINDADE"
        onChange={changeDivinity}
        isLoading={loading}
        options={divinity}
        isClearable
      />
    </div>
  )
}

SelectDivinity.propTypes = {
  changeDivinity: PropTypes.func.isRequired,
  defaultValue: PropTypes.number,
}

SelectDivinity.defaultProps = {
  defaultValue: 0,
}
