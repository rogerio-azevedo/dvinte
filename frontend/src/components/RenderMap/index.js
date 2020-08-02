import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Stage, Layer, Image, Line } from 'react-konva'
import useImage from 'use-image'
import { connect, socket } from '~/services/socket'

import RenderToken from '~/components/RenderToken'
import { Container } from './styles'

export default function RenderMap({ tokens }) {
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 })
  const [lines, setLines] = useState([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [isDraggable, setIsDraggable] = useState(false)
  const [selectedId, selectShape] = useState(null)

  function handleMouseDown({ evt }) {
    if (evt.button === 1) {
      setIsDrawing(true)
      setIsDraggable(false)
      setLines([...lines, []])
    } else if (evt.button === 0) {
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

  function handleMouseMove({ evt }) {
    if (!isDrawing) {
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

  const [map] = useImage('https://i.redd.it/eouyl4et4mn11.jpg')

  // const [map] = useImage('https://i.imgur.com/cUyn2zF.jpg')

  // const [map] = useImage(
  //   'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7496599d-01b9-4cc1-87e2-6c6313c4df5f/dd2zqek-fbaa86e2-d1e7-4935-b8cb-29fb8a117342.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvNzQ5NjU5OWQtMDFiOS00Y2MxLTg3ZTItNmM2MzEzYzRkZjVmXC9kZDJ6cWVrLWZiYWE4NmUyLWQxZTctNDkzNS1iOGNiLTI5ZmI4YTExNzM0Mi5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.upcbJj1jL9lY6qm-PHeNSh_RBfa3rpXAKLbJDLKxDDs'
  // )

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
          <Image image={map} opacity={0.85} />
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

          {lines.map((line, i) => (
            <Line
              key={i} // eslint-disable-line
              points={line}
              stroke="red"
              strokeWidth={3}
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
