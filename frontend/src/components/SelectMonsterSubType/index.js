import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

export default function SelectMonsterSubType({ changeSubType, defaultValue }) {
  const [subType, setSubType] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const subTypes = [
        { value: 0, label: 'NENHUM' },
        { value: 1, label: 'ÁGUA' },
        { value: 2, label: 'ANJO' },
        { value: 3, label: 'AQUÁTICO' },
        { value: 4, label: 'AR' },
        { value: 5, label: 'ARCONTE' },
        { value: 6, label: 'AVANÇADO' },
        { value: 7, label: 'BAATEZU' },
        { value: 8, label: 'BEM' },
        { value: 9, label: 'CAÓTICO' },
        { value: 10, label: 'ELADRIM' },
        { value: 11, label: 'ENXAME' },
        { value: 12, label: 'FOGO' },
        { value: 13, label: 'FRIO' },
        { value: 14, label: 'GOBLINÓIDE' },
        { value: 15, label: 'GUARDINAL' },
        { value: 16, label: 'INCORPÓREO' },
        { value: 17, label: 'LEAL' },
        { value: 18, label: 'MAL' },
        { value: 19, label: 'METAMORFO' },
        { value: 20, label: 'NATIVO' },
        { value: 21, label: 'PLANAR' },
        { value: 22, label: 'RÉPTIL' },
        { value: 23, label: 'TANAR’RI' },
        { value: 24, label: 'TERRA' },
      ]

      setSubType(subTypes)
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
        value={subType.filter(option => option.value === defaultValue)}
        styles={customStyles}
        maxMenuHeight={250}
        placeholder="ESCOLHA O SUB TIPO"
        onChange={changeSubType}
        isLoading={loading}
        options={subType}
        isClearable
      />
    </div>
  )
}

SelectMonsterSubType.propTypes = {
  changeSubType: PropTypes.func.isRequired,
  defaultValue: PropTypes.number,
}

SelectMonsterSubType.defaultProps = {
  defaultValue: 0,
}
