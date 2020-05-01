import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'
import api from '~/services/api'

export default function SelectClasse({ changeClasse }) {
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
        styles={customStyles}
        maxMenuHeight={250}
        placeholder="ESCOLHA AS CLASSES"
        onChange={changeClasse}
        isLoading={loading}
        options={classe}
        isClearable
        isMulti
      />
    </div>
  )
}

SelectClasse.propTypes = {
  changeClasse: PropTypes.func.isRequired,
}
