import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import * as CANNON from 'cannon'
import Stats from '../../../node_modules/three/examples/js/libs/stats.min.js'

import { Container } from './styles'

import { DiceManager, DiceD20 } from './dice'

const Tree = () => {
  const mount = useRef(null)
  const controls = useRef(null)

  let width = window.innerWidth
  let height = window.innerHeight
  let frameId

  let dice = []
  let scene = []
  let camera = []
  let renderer = []
  let world = []
  let stats = []
  let barrier = []
  const sides = 20

  const dice_color = '#200122'
  const ambient_light_color = 0xf0f5fb
  const spot_light_color = 0xefdfd5

  const dice_box = () => {
    scene = new THREE.Scene()
    world = new CANNON.World()

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    renderer.setSize(width, height)
    renderer.setClearColor(0xffffff, 0)

    camera = new THREE.PerspectiveCamera(18, width / height, 1, 10000)
    camera.position.set(10, 80, 40)
    camera.lookAt(new THREE.Vector3(10, 40, 40))
    camera.position.z = 1
    camera.position.x = -1

    let ambient = new THREE.AmbientLight(ambient_light_color, 0.8)
    scene.add(ambient)

    let directionalLight = new THREE.DirectionalLight(spot_light_color, 1.2)
    directionalLight.position.x = -1000
    directionalLight.position.y = 1000
    directionalLight.position.z = 1000
    scene.add(directionalLight)

    let light = new THREE.SpotLight(spot_light_color, 1.2)
    light.position.y = 100
    light.target.position.set(0, 0, 0)
    light.castShadow = true
    light.shadow.camera.near = 50
    light.shadow.camera.far = 110
    light.shadow.mapSize.width = 1024
    light.shadow.mapSize.height = 1024
    scene.add(light)

    stats = new Stats()

    // FLOOR
    let floorMaterial = new THREE.MeshPhongMaterial({
      // color: '#00aa00',
      // side: THREE.DoubleSide,
    })
    let floorGeometry = new THREE.PlaneGeometry(48, 25, 30)
    let floor = new THREE.Mesh(floorGeometry, floorMaterial)
    floor.receiveShadow = true
    floor.rotation.x = Math.PI / 2
    scene.add(floor)

    // let desk = new THREE.Mesh()
    // new THREE.PlaneGeometry(width, height * 2, 1, 1)
    // desk.receiveShadow = use_shadows
    // scene.add(desk)

    //this.renderer.render(this.scene, this.camera)

    world.gravity.set(0, -9.82 * 20, 0)
    world.broadphase = new CANNON.NaiveBroadphase()
    world.solver.iterations = 16

    DiceManager.setWorld(world)

    //Floor
    let floorBody = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Plane(),
      material: DiceManager.floorBodyMaterial,
    })

    floorBody.quaternion.setFromAxisAngle(
      new CANNON.Vec3(1, 0, 0),
      -Math.PI / 2
    )
    world.add(floorBody)

    //Walls

    barrier = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Plane(),
      material: DiceManager.barrierBodyMaterial,
    })
    barrier.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 2)
    barrier.position.set(500 * 0.93, 0, 0)
    world.add(barrier)

    // barrier = new CANNON.Body({
    //   mass: 0,
    //   shape: new CANNON.Plane(),
    //   material: DiceManager.barrierBodyMaterial,
    // })
    // barrier.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2)
    // barrier.position.set(0, -height * 0.93, 0)
    // world.add(barrier)

    //PAREDE DIREITA
    barrier = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Plane(),
      material: DiceManager.barrierBodyMaterial,
    })
    barrier.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 2)
    barrier.position.set(1, width, 0)
    world.add(barrier)

    const colors = [dice_color]
    for (let i = 0; i < 1; i++) {
      var die = new DiceD20({ size: 1.5, backColor: colors[i] })
      scene.add(die.getObject())
      dice.push(die)
    }

    const renderScene = () => {
      renderer.render(scene, camera)
    }

    const handleResize = () => {
      width = mount.current.clientWidth
      height = mount.current.clientHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderScene()
    }

    const animate = () => {
      renderScene()
      updatePhysics()
      update()
      frameId = window.requestAnimationFrame(animate)
    }

    function updatePhysics() {
      world.step(1.0 / 60.0)

      for (let i in dice) {
        dice[i].updateMeshFromBody()
      }
    }

    function update() {
      stats.update()
      controls.current.stop()
    }

    const start = () => {
      if (!frameId) {
        frameId = requestAnimationFrame(animate)
      }
    }

    const stop = () => {
      cancelAnimationFrame(frameId)
      frameId = null
    }

    mount.current.appendChild(renderer.domElement)
    window.addEventListener('resize', handleResize)
    start()

    controls.current = { start, stop }

    return () => {
      stop()
      window.removeEventListener('resize', handleResize)
      mount.current.removeChild(renderer.domElement)

      scene.remove(this.cube)
      this.geometry.dispose()
      this.material.dispose()
    }
  }

  function randomDiceThrow() {
    var diceValues = []

    let calc = 0
    let multiplier = 1

    const random = () => {
      return Math.floor(Math.random() * sides) + 1
    }

    // eslint-disable-next-line
    for (let i = 0; i < multiplier; i++) {
      calc += random()
    }

    let diceResult = calc

    for (let i = 0; i < dice.length; i++) {
      let yRand = Math.floor(Math.random() * 20)
      dice[i].getObject().position.x = -35 - (i % 3) * 1.5
      dice[i].getObject().position.y = 2 + Math.floor(i / 3) * 1.5
      dice[i].getObject().position.z = -15 + (i % 3) * 1.5
      dice[i].getObject().quaternion.x =
        ((Math.random() * 90 - 45) * Math.PI) / 180
      dice[i].getObject().quaternion.z =
        ((Math.random() * 90 - 45) * Math.PI) / 180
      dice[i].updateBodyFromMesh()
      let rand = Math.random() * 5
      dice[i].getObject().body.velocity.set(45 + rand, 40 + yRand, 15 + rand)
      dice[i]
        .getObject()
        .body.angularVelocity.set(
          30 * Math.random() - 10,
          30 * Math.random() - 10,
          30 * Math.random() - 10
        )

      diceValues.push({ dice: dice[i], value: i + diceResult })
    }

    DiceManager.prepareValues(diceValues)
  }

  useEffect(() => {
    //setTableWidth(mount)
    //setTableHeight(mount)

    dice_box()
    console.log(frameId)
    //randomDiceThrow()
  }, []) // eslint-disable-line

  // useEffect(() => {
  //   if (isAnimating) {
  //     controls.current.start()
  //     console.log(isAnimating)
  //   } else {
  //     controls.current.stop() // eslint-disable-line
  //   }
  // }, [isAnimating])

  const handleThrow = () => {
    console.log('Before Throw', new Date())
    randomDiceThrow()
  }

  return (
    <Container ref={mount}>
      <button type="button" onClick={handleThrow}>
        Rolar
      </button>
    </Container>
  )
}

export default Tree
