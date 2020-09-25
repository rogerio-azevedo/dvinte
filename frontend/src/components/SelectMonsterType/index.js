import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

export default function SelectMonsterType({ changeType, defaultValue }) {
  const [type, setType] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const types = [
        { value: 0, label: 'NENHUM' },
        { value: 1, label: 'ABERRAÇÃO' },
        { value: 2, label: 'ANIMAL' },
        { value: 3, label: 'BESTA MÁGICA' },
        { value: 4, label: 'CONSTRUCTO' },
        { value: 5, label: 'DRGÃO' },
        { value: 6, label: 'ELEMENTAL' },
        { value: 7, label: 'EXTRA-PLANAR' },
        { value: 8, label: 'FADA' },
        { value: 9, label: 'GIGANTE' },
        { value: 10, label: 'HUMANOIDE MONSTRUOSO' },
        { value: 11, label: 'HUMANOIDE' },
        { value: 12, label: 'INSETO' },
        { value: 13, label: 'LIMO' },
        { value: 14, label: 'MORTO–VIVO' },
        { value: 15, label: 'PLANTA' },
      ]

      setType(types)
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
        value={type.filter(option => option.value === defaultValue)}
        styles={customStyles}
        maxMenuHeight={250}
        placeholder="ESCOLHA O TIPO"
        onChange={changeType}
        isLoading={loading}
        options={type}
        isClearable
      />
    </div>
  )
}

SelectMonsterType.propTypes = {
  changeType: PropTypes.func.isRequired,
  defaultValue: PropTypes.number,
}

SelectMonsterType.defaultProps = {
  defaultValue: 0,
}
