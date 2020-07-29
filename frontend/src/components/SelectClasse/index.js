import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'
import api from '~/services/api'

export default function SelectClasse({ changeClasse, defaultValue }) {
  const [classe, setClasse] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const response = await api.get('classes')

      const clas = response.data.map(m => ({
        value: m.id,
        label: m.name.toUpperCase(),
      }))

      setClasse(clas)
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
        value={classe.filter(option => option.value === defaultValue)}
        styles={customStyles}
        maxMenuHeight={250}
        placeholder="ESCOLHA A CLASSE"
        onChange={changeClasse}
        isLoading={loading}
        options={classe}
        isClearable
      />
    </div>
  )
}

SelectClasse.propTypes = {
  changeClasse: PropTypes.func.isRequired,
  defaultValue: PropTypes.number,
}

SelectClasse.defaultProps = {
  defaultValue: 0,
}
