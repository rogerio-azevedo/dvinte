import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Stage, Layer, Image, Line } from 'react-konva'
import useImage from 'use-image'
import { connect, socket } from '~/services/socket'

import Token from '~/components/Token'

export default function RenderMap({ tokens, tool }) {
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 })
  const [lines, setLines] = useState([])
  const [isDrawing, setIsDrawing] = useState(false)

  function handleMouseDown() {
    if (tool === 'Pincel') {
      setIsDrawing(true)
      setLines([...lines, []])
    }
  }

  function handleMouseUp() {
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

  useEffect(() => {
    connect()
  }, []) // eslint-disable-line

  useEffect(() => {
    socket.on('line.message', data => {
      setLines(data)
    })
  }, [lines])

  // const [map] = useImage('https://i.imgur.com/cUyn2zF.jpg')
  const [map] = useImage(
    'https://i.pinimg.com/originals/10/0e/2b/100e2bc6b357eb9909ce215f8d2c72ba.png'
  )

  return (
    <Stage
      x={stagePos.x}
      y={stagePos.y}
      width={3840}
      height={2160}
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
            <Token
              tokens={tokens}
              key={item.id}
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
        {lines.map((line, i) => (
          // eslint-disable-next-line
          <Line key={i} points={line} stroke="red" strokeWidth={3} />
        ))}
      </Layer>
    </Stage>
  )
}

RenderMap.propTypes = {
  tokens: PropTypes.arrayOf(PropTypes.object),
  tool: PropTypes.string.isRequired,
}

RenderMap.defaultProps = {
  tokens: [],
}
