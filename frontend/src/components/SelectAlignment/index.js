import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'
import api from 'services/api'

export default function SelectAlignment({ changeAlignment, defaultValue }) {
  const [alignment, setAlignment] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const response = await api.get('alignments')

      const align = response.data.map(m => ({
        value: m.id,
        label: m.name.toUpperCase(),
      }))

      setAlignment(align)
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
        value={alignment.filter(option => option.value === defaultValue)}
        styles={customStyles}
        maxMenuHeight={250}
        placeholder="ESCOLHA O ALINHAMENTO"
        onChange={changeAlignment}
        isLoading={loading}
        options={alignment}
        isClearable
      />
    </div>
  )
}

SelectAlignment.propTypes = {
  changeAlignment: PropTypes.func.isRequired,
  defaultValue: PropTypes.number,
}

SelectAlignment.defaultProps = {
  defaultValue: 0,
}
