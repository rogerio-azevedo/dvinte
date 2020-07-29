import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

import * as Styles from './styles'

export default function SelectLevel({ changeLevel, defaultValue }) {
  const [level, setLevel] = useState([])
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

      setLevel(niveis)
      setLoading(false)
    }
    load()
  }, [])

  const customStyles = {
    option: provided => ({
      ...provided,
      borderBottom: '1px dotted #8e0e00',
      color: '#8e0e00',
      padding: 10,
    }),

    control: base => ({
      ...base,
      border: 0,
      boxShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.6)',
    }),
  }

  return (
    <Styles.Container>
      <Select
        value={level.filter(option => option.value === defaultValue)}
        styles={customStyles}
        maxMenuHeight={250}
        placeholder="ESCOLHA O NIVEL"
        onChange={changeLevel}
        isLoading={loading}
        options={level}
        isClearable
      />
    </Styles.Container>
  )
}

SelectLevel.propTypes = {
  changeLevel: PropTypes.func.isRequired,
  defaultValue: PropTypes.number,
}

SelectLevel.defaultProps = {
  defaultValue: 0,
}
