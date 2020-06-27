import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image'
import PropTypes from 'prop-types'

import api from '~/services/api'

export default function Token({ image, id, x, y, width, height, rotation }) {
  async function handleDragEnd(e) {
    api.put('chartokens', {
      id: e.target.id(),
      x: e.target.x(),
      y: e.target.y(),
    })
  }
  async function handleRotate(e) {
    api.put('chartokens', {
      id: e.target.id(),
      rotation: e.target.rotation(),
    })
  }

  const [tokenImg] = useImage(image)

  return (
    <Image
      draggable
      id={id}
      x={x}
      y={y}
      image={tokenImg}
      width={width}
      height={height}
      scaleX={1}
      offsetX={width / 2}
      offsetY={height / 2}
      rotation={rotation}
      onDragEnd={handleDragEnd}
      onClick={handleRotate}
    />
  )
}

Token.propTypes = {
  image: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  rotation: PropTypes.number.isRequired,
}
