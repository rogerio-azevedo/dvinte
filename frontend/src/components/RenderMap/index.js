import React, { useState } from 'react'
import { Stage, Layer, Rect, Image } from 'react-konva'
import useImage from 'use-image'
import api from '~/services/api'

const width = 50
const height = 50

const grid = [['white']]

export default function RenderMap(tokens) {
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 })
  const startX = Math.floor((-stagePos.x - window.innerWidth) / width) * width
  const endX = Math.floor((-stagePos.x + window.innerWidth * 2) / width) * width

  const startY =
    Math.floor((-stagePos.y - window.innerHeight) / height) * height
  const endY =
    Math.floor((-stagePos.y + window.innerHeight * 2) / height) * height

  const gridComponents = []
  let i = 0
  for (let x = startX; x < endX; x += width) {
    for (let y = startY; y < endY; y += height) {
      if (i === 4) {
        i = 0
      }

      const indexX = Math.abs(x / width) % grid.length
      const indexY = Math.abs(y / height) % grid[0].length

      gridComponents.push(
        <Rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={grid[indexX][indexY]}
          stroke="gray"
          strokeWidth={2}
          dash={['5', '5']}
        />
      )
    }
  }

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

  const Token = props => {
    const { image } = props
    const { id } = props
    const { x } = props
    const { y } = props
    const { width } = props
    const { height } = props
    const { rotation } = props

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

  return (
    <Stage
      x={stagePos.x}
      y={stagePos.y}
      width={1200}
      height={600}
      draggable
      onDragEnd={e => {
        setStagePos(e.currentTarget.position())
      }}
    >
      <Layer>
        {gridComponents}

        {tokens &&
          tokens.tokens &&
          tokens.tokens.map(item => (
            <Token
              id={item.id}
              x={item.x}
              y={item.y}
              image={item.image}
              width={item.width}
              height={item.height}
              offsetX={item.width / 2}
              offsetY={item.height / 2}
              rotation={item.rotation}
            />
          ))}

        {/* {tokens &&
          tokens.tokens &&
          tokens.tokens.map(item => (
            <Image
              draggable
              id={item.id}
              x={item.x}
              y={item.y}
              image={tok}
              width={item.width}
              height={item.height}
              offsetX={item.width / 2}
              offsetY={item.height / 2}
              scaleX={1}
              rotation={item.angle}
              onDragEnd={handleDragEnd}
              onClick={handleRotate}
            />
          ))} */}
      </Layer>
    </Stage>
  )
}
