import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'
import api from '~/services/api'

export default function SelectDivinity({ changeDivinity }) {
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
}
