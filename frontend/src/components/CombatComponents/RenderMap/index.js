import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Stage, Layer, Line, Image, Rect } from 'react-konva'
import useImage from 'use-image'

import { connect, socket } from '~/services/socket'

import CharToken from '~/components/CombatComponents/CharToken'
import { Container } from './styles'

import api from '~/services/api'

const grid = 68
const gridWidth = 2000

export default function RenderMap({ tokens }) {
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 })

  const linesA = []
  const linesB = []

  for (let i = 0; i < gridWidth / grid; i++) {
    linesA.push(
      <Line
        key={`${i}v`}
        strokeWidth={2}
        stroke={'black'}
        points={[i * grid, 0, i * grid, gridWidth]}
      />
    )

    linesB.push(
      <Line
        key={`${i}h`}
        strokeWidth={2}
        stroke={'black'}
        points={[0, i * grid, gridWidth, i * grid]}
      />
    )
  }

  const [lines, setLines] = useState([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [isDraggable, setIsDraggable] = useState(false)
  const [selectedId, selectShape] = useState(null)

  const [mapData, setMapData] = useState({})

  async function getMap() {
    const response = await api.get('maps/1', {
      params: {
        type: 2,
      },
    })

    setMapData(response.data)
  }

  useEffect(() => {
    getMap()
    connect()
  }, []) // eslint-disable-line

  function handleMouseDown(e) {
    if (e.evt.button === 2) {
      setIsDrawing(true)
      setIsDraggable(false)

      const pointer = e.target.getStage().getPointerPosition()

      const newLines = lines.concat({
        id: Date.now(),
        tool: 'eraser',
        points: [pointer.x, pointer.y],
      })
      setLines(newLines)
    } else if (e.evt.button === 0) {
      setIsDraggable(true)
    }
  }

  function handleMouseUp(e) {
    const clickedOnEmpty = e.target !== e.target.getStage()
    if (clickedOnEmpty) {
      selectShape(null)
    }

    if (isDrawing) {
      setIsDrawing(false)
      socket.emit('line.message', lines)
    }
  }

  function handleMouseMove(e) {
    if (!isDrawing) {
      return
    }

    const pointer = e.target.getStage().getPointerPosition()
    const newLines = lines.slice()
    const lastLine = {
      ...newLines[newLines.length - 1],
    }
    lastLine.size = 50
    lastLine.points = lastLine.points.concat([pointer.x, pointer.y])
    newLines[newLines.length - 1] = lastLine
    setLines(newLines)
  }

  useEffect(() => {
    socket.on('line.message', data => {
      setLines(data)
    })
  }, [lines])

  const [map] = useImage(mapData?.url)

  return (
    <Container>
      {/* <input
        value={size}
        onChange={e => {
          setSize(parseInt(e.target.value))
        }}
        type="range"
        step="3"
        min="3"
        max="200"
      /> */}

      <Stage
        x={stagePos.x}
        y={stagePos.y}
        width={2000}
        height={2000}
        //draggable
        onDragEnd={e => {
          setStagePos(e.currentTarget.position())
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onContextMenu={e => {
          e.evt.preventDefault()
        }}
      >
        <Layer>
          <Image image={map} opacity={1} />
        </Layer>

        <Layer>
          {linesA}
          {linesB}
        </Layer>

        {/* <Label x={150} y={50}>
          <Tag
            fill="black"
            pointerDirection="down"
            pointerWidth={10}
            pointerHeight={10}
            lineJoin="round"
            shadowColor="black"
          />
          <Text
            text="Tooltip pointing down"
            fontFamily="Calibri"
            fontSize={18}
            padding={5}
            fill="white"
          />
        </Label> */}

        <Layer>
          <Rect
            x={0}
            y={0}
            width={2000}
            height={2000}
            fill="#333"
            opacity={0}
          />

          {lines.map(line => (
            <Line
              key={line.id}
              strokeWidth={line.size}
              stroke={'black'}
              points={line.points}
              globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          ))}
        </Layer>

        <Layer>
          {tokens &&
            tokens.map(item => (
              <CharToken
                tokens={tokens}
                key={item.id}
                id={item.id}
                x={item.x}
                y={item.y}
                isSelected={item.id === selectedId}
                onSelect={() => {
                  selectShape(item.id)
                }}
                image={item.image}
                width={item.width}
                height={item.height}
                //offsetX={item.width / 2}
                //offsetY={item.height / 2}
                rotation={item.rotation}
                draggable={isDraggable}
              />
            ))}
        </Layer>
      </Stage>
    </Container>
  )
}

RenderMap.propTypes = {
  tokens: PropTypes.arrayOf(PropTypes.object),
}

RenderMap.defaultProps = {
  tokens: [],
}
