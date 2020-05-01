import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

export default function SelectSize({ changeSize }) {
  const [size, setSize] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const sizes = [
        { value: 1, label: 'PEQUENO' },
        { value: 2, label: 'MEDIO' },
        { value: 3, label: 'GRANDE' },
      ]

      setSize(sizes)
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
        placeholder="ESCOLHA O TAMANHO"
        onChange={changeSize}
        isLoading={loading}
        options={size}
        isClearable
      />
    </div>
  )
}

SelectSize.propTypes = {
  changeSize: PropTypes.func.isRequired,
}
