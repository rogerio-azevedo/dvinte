import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'
import api from '~/services/api'

export default function SelectRace({ changeRace }) {
  const [race, setRace] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const response = await api.get('races')

      const races = response.data.map(m => ({
        value: m.id,
        label: m.name.toUpperCase(),
      }))

      setRace(races)
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
        placeholder="ESCOLHA A RAÇA"
        onChange={changeRace}
        isLoading={loading}
        options={race}
        isClearable
      />
    </div>
  )
}

SelectRace.propTypes = {
  changeRace: PropTypes.func.isRequired,
}
