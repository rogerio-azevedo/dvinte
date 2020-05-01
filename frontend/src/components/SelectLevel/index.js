import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

export default function SelectLevel({ changeLevel }) {
  const [level, setLevels] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const niveis = [
        { value: 1, label: 'UM' },
        { value: 2, label: 'DOIS' },
        { value: 3, label: 'TRES' },
        { value: 4, label: 'QUATRO' },
        { value: 5, label: 'CINCO' },
        { value: 6, label: 'SEIS' },
        { value: 7, label: 'SETE' },
        { value: 8, label: 'OITO' },
        { value: 9, label: 'NOVE' },
        { value: 10, label: 'DEZ' },
        { value: 11, label: 'ONZE' },
        { value: 12, label: 'DOZE' },
        { value: 13, label: 'TREZE' },
        { value: 14, label: 'QUATORZE' },
        { value: 15, label: 'QUINZE' },
        { value: 16, label: 'DEZESSEIS' },
        { value: 17, label: 'DESESSETE' },
        { value: 18, label: 'DEZOITO' },
        { value: 19, label: 'DEZENOVE' },
        { value: 20, label: 'VINTE' },
      ]

      setLevels(niveis)
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
        placeholder="ESCOLHA O NIVEL"
        onChange={changeLevel}
        isLoading={loading}
        options={level}
        isClearable
      />
    </div>
  )
}

SelectLevel.propTypes = {
  changeLevel: PropTypes.func.isRequired,
}
