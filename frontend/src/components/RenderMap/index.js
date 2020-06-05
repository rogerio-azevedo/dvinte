import React, { useState } from 'react'
import { Stage, Layer, Rect, Image } from 'react-konva'
import useImage from 'use-image'

const width = 50
const height = 50

const grid = [['white']]

export default function RenderMap() {
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 })
  const startX = Math.floor((-stagePos.x - window.innerWidth) / width) * width
  const endX = Math.floor((-stagePos.x + window.innerWidth * 2) / width) * width

  const [worgX, setWorgX] = useState(1090)
  const [worgY, setWorgY] = useState(110)
  const [worgAngle, setWorgAngle] = useState(90)

  const [worg2X, setWorg2X] = useState(1090)
  const [worg2Y, setWorg2Y] = useState(470)
  const [worg2Angle, setWorg2Angle] = useState(90)

  const [worgRiderX, setWorgRiderX] = useState(1090)
  const [worgRiderY, setWorgRiderY] = useState(360)
  const [worgRiderAngle, setWorgRiderAngle] = useState(90)

  const [tigerX, setTigerX] = useState(1090)
  const [tigerY, setTigerY] = useState(200)
  const [tigerAngle, setTigerAngle] = useState(90)

  const [barbarianX, setBarbarianX] = useState(270)
  const [barbarianY, setBarbarianY] = useState(170)
  const [barbarianAngle, setBarbarianAngle] = useState(-90)

  const [rogueX, setRogueX] = useState(180)
  const [rogueY, setRogueY] = useState(270)
  const [rogueAngle, setRogueAngle] = useState(-90)

  const [warriorX, setWarriorX] = useState(280)
  const [warriorY, setWarriorY] = useState(320)
  const [warriorAngle, setWarriorAngle] = useState(-90)

  const [mageX, setMageX] = useState(70)
  const [mageY, setMageY] = useState(170)
  const [mageAngle, setMageAngle] = useState(-90)

  const [clericX, setClericX] = useState(70)
  const [clericY, setClericY] = useState(320)
  const [clericAngle, setClericAngle] = useState(-90)

  const [worg] = useImage(
    'https://i.pinimg.com/originals/52/27/1c/52271cc8557b05de8ca8f530e97e60d4.png'
  )
  const [worg2] = useImage(
    'https://i.pinimg.com/originals/52/27/1c/52271cc8557b05de8ca8f530e97e60d4.png'
  )

  const [rogue] = useImage(
    'http://www.syncrpg.com/sam/data/tokenImages/Devin_Night/commissioned/M_Noble_archer_Dark_02_hi.png'
  )

  const [barbarian] = useImage(
    'http://www.syncrpg.com/sam/data/tokenImages/Devin_Night/commissioned/AA_GS_M_Barbarian_02_hi.png'
  )

  const [worgRider] = useImage(
    'http://www.syncrpg.com/sam/data/tokenImages/Devin_Night/commissioned/Orc_Worg_rider_02_hi.png'
  )
  const [tiger] = useImage(
    'http://www.syncrpg.com/sam/data/tokenImages/Devin_Night/allfreezippedpacks/werecreature_27.png'
  )

  const [cleric] = useImage(
    'http://www.syncrpg.com/sam/data/tokenImages/Devin_Night/commissioned/M_Human_Conjurer_02_hi.png'
  )

  const [warrior] = useImage(
    'https://ya-webdesign.com/transparent250_/warrior-token-png-14.png'
  )
  const [mage] = useImage(
    'http://www.syncrpg.com/sam/data/tokenImages/Devin_Night/commissioned/Shadow_Sorcerer_02_hi.png'
  )

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

  function handleWarriorDragEnd(e) {
    setWarriorX(e.target.x())
    setWarriorY(e.target.y())
  }

  function handleBarbarianDragEnd(e) {
    setBarbarianX(e.target.x())
    setBarbarianY(e.target.y())
  }

  function handleClericDragEnd(e) {
    setClericX(e.target.x())
    setClericY(e.target.y())
  }

  function handleRogueDragEnd(e) {
    setRogueX(e.target.x())
    setRogueY(e.target.y())
  }

  function handleMageDragEnd(e) {
    setMageX(e.target.x())
    setMageY(e.target.y())
  }

  function handleWorgDragEnd(e) {
    setWorgX(e.target.x())
    setWorgY(e.target.y())
  }

  function handleWorg2DragEnd(e) {
    setWorg2X(e.target.x())
    setWorg2Y(e.target.y())
  }

  function handleWorgRiderDragEnd(e) {
    setWorgRiderX(e.target.x())
    setWorgRiderY(e.target.y())
  }

  function handleTigerDragEnd(e) {
    setTigerX(e.target.x())
    setTigerY(e.target.y())
  }

  function rotate(character) {
    switch (character) {
      case 'worg':
        setWorgAngle(worgAngle + 30)
        break
      case 'worg2':
        setWorg2Angle(worg2Angle + 30)
        break
      case 'worgRider':
        setWorgRiderAngle(worgRiderAngle + 30)
        break
      case 'tiger':
        setTigerAngle(tigerAngle + 30)
        break
      case 'warrior':
        setWarriorAngle(warriorAngle + 30)
        break
      case 'barbarian':
        setBarbarianAngle(barbarianAngle + 30)
        break
      case 'rogue':
        setRogueAngle(rogueAngle + 30)
        break
      case 'mage':
        setMageAngle(mageAngle + 30)
        break
      case 'cleric':
        setClericAngle(clericAngle + 30)
        break
      default:
    }

    // const { angle } = this.state
    // this.setState({
    //   angle: angle + 90,
    // })
    // this.imageNode.offsetX(this.imageNode.width() / 2);
    // this.imageNode.offsetY(this.imageNode.height() / 2);
    // this.imageNode.getLayer().draw();
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

        <Image
          draggable
          x={worgX}
          y={worgY}
          image={worg}
          width={90}
          height={90}
          offsetX={90 / 2}
          offsetY={90 / 2}
          scaleX={1}
          rotation={worgAngle}
          onDragEnd={handleWorgDragEnd}
          onClick={() => {
            rotate('worg')
          }}
        />

        <Image
          draggable
          x={worg2X}
          y={worg2Y}
          image={worg2}
          width={90}
          height={90}
          offsetX={90 / 2}
          offsetY={90 / 2}
          scaleX={1}
          rotation={worg2Angle}
          onDragEnd={handleWorg2DragEnd}
          onClick={() => {
            rotate('worg2')
          }}
        />

        <Image
          draggable
          x={worgRiderX}
          y={worgRiderY}
          image={worgRider}
          width={90}
          height={90}
          offsetX={90 / 2}
          offsetY={90 / 2}
          rotation={worgRiderAngle}
          onDragEnd={handleWorgRiderDragEnd}
          onClick={() => {
            rotate('worgRider')
          }}
        />

        <Image
          draggable
          x={tigerX}
          y={tigerY}
          image={tiger}
          width={90}
          height={90}
          offsetX={90 / 2}
          offsetY={90 / 2}
          rotation={tigerAngle}
          onDragEnd={handleTigerDragEnd}
          onClick={() => {
            rotate('tiger')
          }}
        />

        <Image
          draggable
          x={rogueX}
          y={rogueY}
          image={rogue}
          width={80}
          height={80}
          offsetX={80 / 2}
          offsetY={80 / 2}
          rotation={rogueAngle}
          onDragEnd={handleRogueDragEnd}
          onClick={() => {
            rotate('rogue')
          }}
        />

        <Image
          draggable
          x={barbarianX}
          y={barbarianY}
          image={barbarian}
          width={90}
          height={90}
          offsetX={90 / 2}
          offsetY={90 / 2}
          rotation={barbarianAngle}
          onDragEnd={handleBarbarianDragEnd}
          onClick={() => {
            rotate('barbarian')
          }}
        />

        <Image
          draggable
          x={clericX}
          y={clericY}
          image={cleric}
          width={80}
          height={80}
          offsetX={80 / 2}
          offsetY={80 / 2}
          rotation={clericAngle}
          onDragEnd={handleClericDragEnd}
          onClick={() => {
            rotate('cleric')
          }}
        />

        <Image
          draggable
          x={warriorX}
          y={warriorY}
          image={warrior}
          width={100}
          height={100}
          offsetX={100 / 2}
          offsetY={100 / 2}
          rotation={warriorAngle}
          onDragEnd={handleWarriorDragEnd}
          onClick={() => {
            rotate('warrior')
          }}
        />

        <Image
          draggable
          x={mageX}
          y={mageY}
          image={mage}
          width={80}
          height={80}
          offsetX={80 / 2}
          offsetY={80 / 2}
          rotation={mageAngle}
          onDragEnd={handleMageDragEnd}
          onClick={() => {
            rotate('mage')
          }}
        />
      </Layer>
    </Stage>
  )
}
