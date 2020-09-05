import React, { useState, useEffect } from 'react'
import { Stage, Layer, Image } from 'react-konva'
import useImage from 'use-image'

import { connect, socket } from '~/services/socket'

import { Container } from './styles'

import api from '~/services/api'

export default function RenderWorldMap() {
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 })
  const [mapData, setMapData] = useState({})

  async function getMap() {
    const response = await api.get('maps/1')
    setMapData(response.data)
  }

  useEffect(() => {
    const handleMaps = Maps => setMapData(Maps)

    socket.on('map.message', handleMaps)

    return () => socket.off('map.message', handleMaps)
  }, [mapData])

  useEffect(() => {
    getMap()
    connect()
  }, []) // eslint-disable-line

  const [map] = useImage(mapData.world)

  return (
    <Container>
      <Stage
        x={stagePos.x}
        y={stagePos.y}
        width={window.innerWidth}
        height={window.innerHeight}
        draggable
        onDragEnd={e => {
          setStagePos(e.currentTarget.position())
        }}
        // onMouseDown={handleMouseDown}
        // onMouseUp={handleMouseUp}
        // onMouseMove={handleMouseMove}
        onContextMenu={e => {
          e.evt.preventDefault()
        }}
      >
        <Layer>
          <Image
            image={map}
            opacity={1}
            width={window.innerWidth}
            height={window.innerHeight}
          />
        </Layer>
      </Stage>
    </Container>
  )
}
