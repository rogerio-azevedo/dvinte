import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

export default function SelectGender({ changeGender, defaultValue }) {
  const [gender, setGender] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const genders = [
        { value: 1, label: 'MASCULINIO' },
        { value: 2, label: 'FEMININO' },
      ]

      setGender(genders)
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
        value={gender.filter(option => option.value === defaultValue)}
        styles={customStyles}
        maxMenuHeight={250}
        placeholder="ESCOLHA O SEXO"
        onChange={changeGender}
        isLoading={loading}
        options={gender}
        isClearable
      />
    </div>
  )
}

SelectGender.propTypes = {
  changeGender: PropTypes.func.isRequired,
  defaultValue: PropTypes.number,
}

SelectGender.defaultProps = {
  defaultValue: 0,
}
