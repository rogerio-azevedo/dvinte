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
    <div style={{ width: '250px', marginRight: '15px' }}>
      <Select
        styles={customStyles}
        maxMenuHeight={250}
        placeholder="ESCOLHA A PERSONAGEM"
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
