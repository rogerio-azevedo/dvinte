import React, { useEffect, useRef } from 'react'
import { Image, Transformer } from 'react-konva'
import Konva from 'konva'
import useImage from 'use-image'
import PropTypes from 'prop-types'

import api from '../../../services/api'

export default function CharToken({
  image,
  id,
  x,
  y,
  width,
  height,
  rotation,
  onSelect,
  isSelected,
  draggable,
  opacity,
}) {
  const shapeRef = useRef()
  const trRef = useRef()

  const grid = 1

  async function handleDragStart(e) {
    e.target.setAttrs({
      shadowOffset: {
        x: 15,
        y: 15,
      },
      scaleX: 1.1,
      scaleY: 1.1,
    })
  }

  async function handleDragEnd(e) {
    e.target.to({
      duration: 0.7,
      easing: Konva.Easings.ElasticEaseOut,
      scaleX: 1,
      scaleY: 1,
      shadowOffsetX: 5,
      shadowOffsetY: 5,

      x: Math.round(e.target.x() / grid) * grid,
      y: Math.round(e.target.y() / grid) * grid,
    })

    const tokenData = {
      id: Number(e.target.id()) || e.target.id(),
      x: e.target.x(),
      y: e.target.y(),
    }

    // Salva no banco (o backend já emite via Socket.IO)
    await api.put('chartokens', tokenData)
  }

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current])
      trRef.current.getLayer().batchDraw()
    }
  }, [isSelected])

  async function handleTransform(e) {
    const tokenData = {
      id: Number(e.target.id()) || e.target.id(),
      x: e.target.x(),
      y: e.target.y(),
      width: e.target.width() * e.target.scaleX(),
      height: e.target.height() * e.target.scaleY(),
      rotation: e.target.rotation(),
    }

    // Salva no banco (o backend já emite via Socket.IO)
    await api.put('chartokens', tokenData)
  }

  const [tokenImg] = useImage(image)

  return (
    <>
      <Image
        draggable={draggable}
        id={id}
        x={x}
        y={y}
        image={tokenImg}
        width={width}
        height={height}
        scaleX={1}
        // offsetX={68 / 2}
        // offsetY={68 / 2}
        rotation={rotation}
        shadowOpacity={0.6}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        onTransformEnd={handleTransform}
        shadowBlur={10}
        innerRadius={20}
        outerRadius={40}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        opacity={opacity}
      />
      {isSelected && <Transformer ref={trRef} />}
    </>
  )
}

CharToken.propTypes = {
  image: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  rotation: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  draggable: PropTypes.bool.isRequired,
  opacity: PropTypes.number.isRequired,
}
