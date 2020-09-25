import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

export default function SelectSize({ changeSize, defaultValue }) {
  const [size, setSize] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const sizes = [
        { value: 1, label: 'MINÚSCULO' },
        { value: 2, label: 'DIMINUTO' },
        { value: 3, label: 'MIÚDO' },
        { value: 4, label: 'PEQUENO' },
        { value: 5, label: 'MÉDIO' },
        { value: 6, label: 'GRANDE' },
        { value: 7, label: 'ENORME' },
        { value: 8, label: 'IMENSO' },
        { value: 9, label: 'COLOSSAL' },
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
    <div style={{ width: '250px' }}>
      <Select
        value={size.filter(option => option.value === defaultValue)}
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
  defaultValue: PropTypes.number,
}

SelectSize.defaultProps = {
  defaultValue: 0,
}
