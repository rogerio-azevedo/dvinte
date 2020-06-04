import React from 'react'
import { Stage, Layer, Rect, Text } from 'react-konva'

const width = 100
const height = 100

const grid = [['white']]

export default function RenderMap() {
  const [stagePos, setStagePos] = React.useState({ x: 0, y: 0 })
  const startX = Math.floor((-stagePos.x - window.innerWidth) / width) * width
  const endX = Math.floor((-stagePos.x + window.innerWidth * 2) / width) * width

  const [isDragging, setIsDraggging] = React.useState(false)
  const [xDrag, setXDrag] = React.useState(50)
  const [yDrag, setYDrag] = React.useState(50)

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
          stroke="black"
        />
      )
    }
  }

  return (
    <Stage
      x={stagePos.x}
      y={stagePos.y}
      width={window.innerWidth}
      height={window.innerHeight}
      draggable
      onDragEnd={e => {
        setStagePos(e.currentTarget.position())
      }}
    >
      <Layer>
        {gridComponents}

        <Text
          text="Draggable Text"
          x={xDrag}
          y={yDrag}
          draggable
          fill={isDragging ? 'green' : 'blue'}
          onDragStart={() => {
            setIsDraggging(true)
          }}
          onDragEnd={e => {
            setIsDraggging(true)
            // setXDrag(e.target.xDrag())
            // setYDrag(e.target.yDrag())

            // this.setState({

            //   isDragging: false,
            //   x: e.target.x(),
            //   y: e.target.y(),
            // })
          }}
        />
      </Layer>
    </Stage>
  )
}
