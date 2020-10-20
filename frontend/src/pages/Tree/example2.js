import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import * as CANNON from 'cannon'

import { Container } from './styles'

import { DiceManager, DiceD20 } from './dice'

import Stats from '../../../node_modules/three/examples/js/libs/stats.min.js'

const Tree = () => {
  const [isAnimating, setAnimating] = useState(true)
  const mount = useRef(null)
  const controls = useRef(null)

  let width = window.innerWidth
  let height = window.innerHeight
  let frameId

  let dices = []
  let dice = []
  let scene = []
  let camera = []
  let renderer = []
  let world = []
  let light = []
  let desk = []
  let stats = []

  let diceResult = 0

  var use_adapvite_timestep = true
  var frame_rate = 1 / 60

  var scale = 50

  var label_color = '#fff'
  const dice_color = '#200122'

  var ambient_light_color = 0xf0f5fb
  var spot_light_color = 0xefdfd5

  var use_shadows = true

  var material_dice_options = {
    specular: 0x172022,
    color: 0xf0f0f0,
    shininess: 40,
    flatShading: true,
  }

  const dice_box = () => {
    scene = new THREE.Scene()
    world = new CANNON.World()

    camera = new THREE.PerspectiveCamera(80, width / height, 0.1, 1000)
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    renderer.setSize(width, height)
    renderer.setClearColor(0xffffff, 0)

    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0xff00ff })
    const cube = new THREE.Mesh(geometry, material)

    camera.position.z = 20

    stats = new Stats()

    // FLOOR
    var floorMaterial = new THREE.MeshPhongMaterial({
      color: '#00aa00',
      side: THREE.DoubleSide,
    })
    var floorGeometry = new THREE.PlaneGeometry(30, 30, 10, 10)
    var floor = new THREE.Mesh(floorGeometry, floorMaterial)
    floor.receiveShadow = true
    floor.rotation.x = Math.PI / 2
    scene.add(floor)

    world.gravity.set(0, -9.82 * 20, 0)
    world.broadphase = new CANNON.NaiveBroadphase()
    world.solver.iterations = 16

    DiceManager.setWorld(world)

    let ambient = new THREE.AmbientLight('#ffffff', 0.3)
    scene.add(ambient)

    let directionalLight = new THREE.DirectionalLight('#ffffff', 0.5)
    directionalLight.position.x = -1000
    directionalLight.position.y = 1000
    directionalLight.position.z = 1000
    scene.add(directionalLight)

    let light = new THREE.SpotLight(0xefdfd5, 1.3)
    light.position.y = 100
    light.target.position.set(0, 0, 0)
    light.castShadow = true
    light.shadow.camera.near = 50
    light.shadow.camera.far = 110
    light.shadow.mapSize.width = 1024
    light.shadow.mapSize.height = 1024
    scene.add(light)

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

    var colors = [dice_color, dice_color, '#00ff00', '#0000ff', '#ff00ff']
    for (var i = 0; i < 2; i++) {
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
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01

      renderScene()
      updatePhysics()
      update()
      frameId = window.requestAnimationFrame(animate)
    }

    function updatePhysics() {
      world.step(1.0 / 60.0)

      for (var i in dice) {
        dice[i].updateMeshFromBody()
      }
    }

    function update() {
      //controls.update()
      stats.update()
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

    for (var i = 0; i < dice.length; i++) {
      let yRand = Math.random() * 20
      dice[i].getObject().position.x = -15 - (i % 3) * 1.5
      dice[i].getObject().position.y = 2 + Math.floor(i / 3) * 1.5
      dice[i].getObject().position.z = -15 + (i % 3) * 1.5
      dice[i].getObject().quaternion.x =
        ((Math.random() * 90 - 45) * Math.PI) / 180
      dice[i].getObject().quaternion.z =
        ((Math.random() * 90 - 45) * Math.PI) / 180
      dice[i].updateBodyFromMesh()
      let rand = Math.random() * 5
      dice[i].getObject().body.velocity.set(25 + rand, 40 + yRand, 15 + rand)
      dice[i]
        .getObject()
        .body.angularVelocity.set(
          20 * Math.random() - 10,
          20 * Math.random() - 10,
          20 * Math.random() - 10
        )

      diceValues.push({ dice: dice[i], value: i + 1 })
    }

    DiceManager.prepareValues(diceValues)
  }

  useEffect(() => {
    dice_box()
    randomDiceThrow()
  }, [])

  useEffect(() => {
    if (isAnimating) {
      controls.current.start()
    } else {
      controls.current.stop() // eslint-disable-line
    }
  }, [isAnimating])

  return (
    <Container
      ref={mount}
      onClick={() => setAnimating(!isAnimating)}
    ></Container>
  )
}

export default Tree
