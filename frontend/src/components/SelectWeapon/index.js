import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

export default function SelectWeapon({ changeWeapon, weapons }) {
  const [weapon, setWeapon] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const data =
        weapons &&
        weapons.map(m => ({
          value: m.id,
          label: m.name.toUpperCase(),
        }))

      setWeapon(data)
      setLoading(false)
    }
    load()
  }, [weapons])

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
        placeholder="ESCOLHA A ARMA"
        onChange={changeWeapon}
        isLoading={loading}
        options={weapon}
        isClearable
      />
    </div>
  )
}

SelectWeapon.propTypes = {
  changeWeapon: PropTypes.func.isRequired,
  weapons: PropTypes.arrayOf.isRequired,

  // character: PropTypes.shape({
  //   Weapon: PropTypes.object.isRequired,
  // }).isRequired,
}
