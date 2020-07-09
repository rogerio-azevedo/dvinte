import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Stage, Layer, Image, Line } from 'react-konva'
import useImage from 'use-image'
import { connect, socket } from '~/services/socket'

import RenderToken from '~/components/RenderToken'
import { Container } from './styles'

export default function RenderMap({ tokens, tool }) {
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 })
  const [lines, setLines] = useState([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [selectedId, selectShape] = useState(null)

  function handleMouseDown() {
    if (tool === 'Pincel') {
      setIsDrawing(true)
      setLines([...lines, []])
    }
  }

  function handleMouseUp(e) {
    const clickedOnEmpty = e.target !== e.target.getStage()
    if (clickedOnEmpty) {
      selectShape(null)
    }

    if (isDrawing && tool === 'Pincel') {
      setIsDrawing(false)
      socket.emit('line.message', lines)
    }
  }

  function handleMouseMove({ evt }) {
    if (!isDrawing && tool !== 'Pincel') {
      return
    }
    const { offsetX, offsetY } = evt

    if (isDrawing) {
      let lastLine = lines[lines.length - 1]
      lastLine = lastLine.concat([offsetX, offsetY])
      lines.splice(lines.length - 1, 1, lastLine)

      setLines(lines.concat())
    }
  }

  // const addLine = (stage, layer, mode = 'brush') => {
  //   let isPaint = false
  //   let lastLine
  //   stage.on('mousedown touchstart', function (e) {
  //     isPaint = true
  //     const pos = stage.getPointerPosition()
  //     lastLine = new Line({
  //       stroke: mode == 'brush' ? 'red' : 'white',
  //       strokeWidth: mode == 'brush' ? 5 : 20,
  //       globalCompositeOperation:
  //         mode === 'brush' ? 'source-over' : 'destination-out',
  //       points: [pos.x, pos.y],
  //       draggable: mode == 'brush',
  //     })
  //     layer.add(lastLine)
  //   })
  //   stage.on('mouseup touchend', function () {
  //     isPaint = false
  //   })
  //   stage.on('mousemove touchmove', function () {
  //     if (!isPaint) {
  //       return
  //     }
  //     const pos = stage.getPointerPosition()
  //     const newPoints = lastLine.points().concat([pos.x, pos.y])
  //     lastLine.points(newPoints)
  //     layer.batchDraw()
  //   })
  // }

  useEffect(() => {
    connect()
  }, []) // eslint-disable-line

  useEffect(() => {
    socket.on('line.message', data => {
      setLines(data)
    })
  }, [lines])

  // const [map] = useImage(
  //   'https://i.pinimg.com/originals/10/0e/2b/100e2bc6b357eb9909ce215f8d2c72ba.png'
  // )

  // const [map] = useImage('https://i.imgur.com/cUyn2zF.jpg')
  const [map] = useImage(
    'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7496599d-01b9-4cc1-87e2-6c6313c4df5f/dd2zqek-fbaa86e2-d1e7-4935-b8cb-29fb8a117342.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvNzQ5NjU5OWQtMDFiOS00Y2MxLTg3ZTItNmM2MzEzYzRkZjVmXC9kZDJ6cWVrLWZiYWE4NmUyLWQxZTctNDkzNS1iOGNiLTI5ZmI4YTExNzM0Mi5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.upcbJj1jL9lY6qm-PHeNSh_RBfa3rpXAKLbJDLKxDDs'
  )
  return (
    <Container>
      <Stage
        x={stagePos.x}
        y={stagePos.y}
        width={3000}
        height={3000}
        // draggable
        onDragEnd={e => {
          setStagePos(e.currentTarget.position())
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <Layer>
          <Image image={map} opacity={0.88} />
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
              />
            ))}

          {lines.map((line, i) => (
            <Line
              key={i} // eslint-disable-line
              points={line}
              stroke="red"
              strokeWidth={3}
              // globalCompositeOperation={
              //   tool === 'Pincel' ? 'source-over' : 'destination-out'
              // }
            /> // eslint-disable-line
          ))}
        </Layer>
      </Stage>
    </Container>
  )
}

RenderMap.propTypes = {
  tokens: PropTypes.arrayOf(PropTypes.object),
  tool: PropTypes.string.isRequired,
}

RenderMap.defaultProps = {
  tokens: [],
}
