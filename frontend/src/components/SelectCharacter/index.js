import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'
import api from '~/services/api'

export default function SelectCharacter({ changeCharacter }) {
  const [character, setCharacter] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const response = await api.get('characters')

      const char = response.data.map(m => ({
        value: m.id,
        label: m.name.toUpperCase(),
      }))

      setCharacter(char)
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
        placeholder="ESCOLHA A PERSOLAGEM"
        onChange={changeCharacter}
        isLoading={loading}
        options={character}
        isClearable
      />
    </div>
  )
}

SelectCharacter.propTypes = {
  changeCharacter: PropTypes.func.isRequired,
}
