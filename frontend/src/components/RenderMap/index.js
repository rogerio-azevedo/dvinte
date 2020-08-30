import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Stage, Layer, Line, Rect } from 'react-konva'
import { connect, socket } from '~/services/socket'

import RenderToken from '~/components/RenderToken'
import ModalGMTools from '~/components/ModalGMTools'
import { Container, GridContainer } from './styles'

import api from '~/services/api'

export default function RenderMap({ tokens }) {
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 })

  const [lines, setLines] = useState([])
  // const [size, setSize] = useState(60)

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

  // // getMeta(map, function (width, height) {
  // //   setMapWidth(width)
  // //   setMapHeight(height)
  // // })

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

  // 'https://i.pinimg.com/originals/10/0e/2b/100e2bc6b357eb9909ce215f8d2c72ba.png'
  // 'https://i.pinimg.com/originals/24/fb/9c/24fb9c4d630ee59df2b7f10acd515d81.jpg'
  // 'https://i.imgur.com/cUyn2zF.jpg'
  // 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7496599d-01b9-4cc1-87e2-6c6313c4df5f/dd2zqek-fbaa86e2-d1e7-4935-b8cb-29fb8a117342.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvNzQ5NjU5OWQtMDFiOS00Y2MxLTg3ZTItNmM2MzEzYzRkZjVmXC9kZDJ6cWVrLWZiYWE4NmUyLWQxZTctNDkzNS1iOGNiLTI5ZmI4YTExNzM0Mi5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.upcbJj1jL9lY6qm-PHeNSh_RBfa3rpXAKLbJDLKxDDs'

  return (
    <Container map={mapData?.url}>
      <GridContainer showgrid={mapData?.grid}>
        <ModalGMTools />

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
          width={mapData?.width}
          height={mapData?.height}
          // draggable
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

            {tokens &&
              tokens.map(item => (
                <RenderToken
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
                  offsetX={item.width / 2}
                  offsetY={item.height / 2}
                  rotation={item.rotation}
                  draggable={isDraggable}
                />
              ))}
            {/* <Image image={map} opacity={0.85} /> */}
            <Rect
              x={0}
              y={0}
              width={mapData?.width}
              height={mapData?.height}
              fill="gray"
              opacity={mapData?.fog ? 1 : 0}
            />

            {lines.map((line, i) => (
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

            {tokens &&
              tokens.map(item => (
                <RenderToken
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
                  offsetX={item.width / 2}
                  offsetY={item.height / 2}
                  rotation={item.rotation}
                  draggable={isDraggable}
                />
              ))}
          </Layer>
        </Stage>
      </GridContainer>
    </Container>
  )
}

RenderMap.propTypes = {
  tokens: PropTypes.arrayOf(PropTypes.object),
}

RenderMap.defaultProps = {
  tokens: [],
}
