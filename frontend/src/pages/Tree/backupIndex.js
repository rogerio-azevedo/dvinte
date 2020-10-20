import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import * as CANNON from 'cannon'

import { Container } from './styles'

import { DiceManager } from './dice'

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

  var random_storage = []
  //this.use_true_random = true
  var use_adapvite_timestep = true
  var frame_rate = 1 / 60

  var scale = 50

  var label_color = '#fff'
  var dice_color = '#200122'

  var ambient_light_color = 0xf0f5fb
  var spot_light_color = 0xefdfd5

  var use_shadows = true

  var material_dice_options = {
    specular: 0x172022,
    color: 0xf0f0f0,
    shininess: 40,
    flatShading: true,
  }

  var dice_inertia = { d4: 5, d6: 13, d8: 10, d10: 9, d12: 8, d20: 6 }

  var dice_mass = {
    d4: 300,
    d6: 300,
    d8: 340,
    d10: 350,
    d12: 350,
    d20: 400,
  }

  var d4_labels = [
    [[], [0, 0, 0], [2, 4, 3], [1, 3, 4], [2, 1, 4], [1, 2, 3]],
    [[], [0, 0, 0], [2, 3, 4], [3, 1, 4], [2, 4, 1], [3, 2, 1]],
    [[], [0, 0, 0], [4, 3, 2], [3, 4, 1], [4, 2, 1], [3, 1, 2]],
    [[], [0, 0, 0], [4, 2, 3], [1, 4, 3], [4, 1, 2], [1, 3, 2]],
  ]

  var standart_d20_dice_face_labels = [
    ' ',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
  ]

  var dice_face_range = {
    d4: [1, 4],
    d6: [1, 6],
    d8: [1, 8],
    d10: [0, 9],
    d12: [1, 12],
    d20: [1, 20],
  }

  var known_types = ['d4', 'd6', 'd8', 'd10', 'd12', 'd20']

  function before_roll(vectors, notation, callback) {
    // do here rpc call or whatever to get your own result of throw.
    // then callback with array of your result, example:
    // callback([2, 2, 2, 2]); // for 4d6 where all dice values are 2.
    //callback([2])
  }

  function notation_getter() {
    return parse_notation('d20')
  }

  function after_roll(notation, result) {
    console.log(notation)
    console.log(result)

    if (result?.length > 1) {
      diceResult = result?.reduce((acc, val) => {
        return acc + val
      })
    } else {
      diceResult = result
    }
  }

  const copy = obj => {
    if (!obj) return obj
    return copyto(obj, new obj.constructor())
  }

  const copyto = (obj, res) => {
    if (obj == null || typeof obj !== 'object') return obj
    if (obj instanceof Array) {
      for (var i = obj.length - 1; i >= 0; --i) res[i] = copy(obj[i])
    } else {
      for (var i in obj) {
        if (obj.hasOwnProperty(i)) res[i] = copy(obj[i])
      }
    }
    return res
  }

  const get_mouse_coords = ev => {
    var touches = ev.changedTouches
    if (touches) return { x: touches[0].clientX, y: touches[0].clientY }
    return { x: ev.clientX, y: ev.clientY }
  }

  const bind = (sel, eventname, func, bubble) => {
    if (!sel) return
    if (eventname.constructor === Array) {
      for (var i in eventname)
        sel.addEventListener(eventname[i], func, bubble ? bubble : false)
    } else sel.addEventListener(eventname, func, bubble ? bubble : false)
  }

  const unbind = (sel, eventname, func, bubble) => {
    if (eventname.constructor === Array) {
      for (var i in eventname)
        sel.removeEventListener(eventname[i], func, bubble ? bubble : false)
    } else sel.removeEventListener(eventname, func, bubble ? bubble : false)
  }

  function prepare_rnd(callback) {
    // if (!random_storage.length && false) {
    //   try {
    //     rpc({ method: 'random', n: 512 }, function (random_responce) {
    //       if (!random_responce.error)
    //         random_storage = random_responce.result.random.data
    //       else use_true_random = false
    //       callback()
    //     })
    //     return
    //   } catch (e) {
    //     use_true_random = false
    //   }
    // }
    callback()
  }

  function rnd() {
    return random_storage.length ? random_storage.pop() : Math.random()
  }

  function create_shape(vertices, faces, radius) {
    var cv = new Array(vertices.length),
      cf = new Array(faces.length)
    for (var i = 0; i < vertices.length; ++i) {
      var v = vertices[i]
      cv[i] = new CANNON.Vec3(v.x * radius, v.y * radius, v.z * radius)
    }
    for (var i = 0; i < faces.length; ++i) {
      cf[i] = faces[i].slice(0, faces[i].length - 1)
    }
    return new CANNON.ConvexPolyhedron(cv, cf)
  }

  function make_geom(vertices, faces, radius, tab, af) {
    var geom = new THREE.Geometry()
    for (var i = 0; i < vertices.length; ++i) {
      var vertex = vertices[i].multiplyScalar(radius)
      vertex.index = geom.vertices.push(vertex) - 1
    }
    for (var i = 0; i < faces.length; ++i) {
      var ii = faces[i],
        fl = ii.length - 1
      var aa = (Math.PI * 2) / fl
      for (var j = 0; j < fl - 2; ++j) {
        geom.faces.push(
          new THREE.Face3(
            ii[0],
            ii[j + 1],
            ii[j + 2],
            [
              geom.vertices[ii[0]],
              geom.vertices[ii[j + 1]],
              geom.vertices[ii[j + 2]],
            ],
            0,
            ii[fl] + 1
          )
        )
        geom.faceVertexUvs[0].push([
          new THREE.Vector2(
            (Math.cos(af) + 1 + tab) / 2 / (1 + tab),
            (Math.sin(af) + 1 + tab) / 2 / (1 + tab)
          ),
          new THREE.Vector2(
            (Math.cos(aa * (j + 1) + af) + 1 + tab) / 2 / (1 + tab),
            (Math.sin(aa * (j + 1) + af) + 1 + tab) / 2 / (1 + tab)
          ),
          new THREE.Vector2(
            (Math.cos(aa * (j + 2) + af) + 1 + tab) / 2 / (1 + tab),
            (Math.sin(aa * (j + 2) + af) + 1 + tab) / 2 / (1 + tab)
          ),
        ])
      }
    }
    geom.computeFaceNormals()
    geom.boundingSphere = new THREE.Sphere(new THREE.Vector3(), radius)
    return geom
  }

  function chamfer_geom(vectors, faces, chamfer) {
    var chamfer_vectors = [],
      chamfer_faces = [],
      corner_faces = new Array(vectors.length)
    for (var i = 0; i < vectors.length; ++i) corner_faces[i] = []
    for (var i = 0; i < faces.length; ++i) {
      var ii = faces[i],
        fl = ii.length - 1
      var center_point = new THREE.Vector3()
      var face = new Array(fl)
      for (var j = 0; j < fl; ++j) {
        var vv = vectors[ii[j]].clone()
        center_point.add(vv)
        corner_faces[ii[j]].push((face[j] = chamfer_vectors.push(vv) - 1))
      }
      center_point.divideScalar(fl)
      for (var j = 0; j < fl; ++j) {
        var vv = chamfer_vectors[face[j]]
        vv.subVectors(vv, center_point)
          .multiplyScalar(chamfer)
          .addVectors(vv, center_point)
      }
      face.push(ii[fl])
      chamfer_faces.push(face)
    }
    for (var i = 0; i < faces.length - 1; ++i) {
      for (var j = i + 1; j < faces.length; ++j) {
        var pairs = [],
          lastm = -1
        for (var m = 0; m < faces[i].length - 1; ++m) {
          var n = faces[j].indexOf(faces[i][m])
          if (n >= 0 && n < faces[j].length - 1) {
            if (lastm >= 0 && m != lastm + 1) pairs.unshift([i, m], [j, n])
            else pairs.push([i, m], [j, n])
            lastm = m
          }
        }
        if (pairs.length != 4) continue
        chamfer_faces.push([
          chamfer_faces[pairs[0][0]][pairs[0][1]],
          chamfer_faces[pairs[1][0]][pairs[1][1]],
          chamfer_faces[pairs[3][0]][pairs[3][1]],
          chamfer_faces[pairs[2][0]][pairs[2][1]],
          -1,
        ])
      }
    }
    for (var i = 0; i < corner_faces.length; ++i) {
      var cf = corner_faces[i],
        face = [cf[0]],
        count = cf.length - 1
      while (count) {
        for (var m = faces.length; m < chamfer_faces.length; ++m) {
          var index = chamfer_faces[m].indexOf(face[face.length - 1])
          if (index >= 0 && index < 4) {
            if (--index == -1) index = 3
            var next_vertex = chamfer_faces[m][index]
            if (cf.indexOf(next_vertex) >= 0) {
              face.push(next_vertex)
              break
            }
          }
        }
        --count
      }
      face.push(-1)
      chamfer_faces.push(face)
    }
    return { vectors: chamfer_vectors, faces: chamfer_faces }
  }

  function create_geom(vertices, faces, radius, tab, af, chamfer) {
    var vectors = new Array(vertices.length)
    for (var i = 0; i < vertices.length; ++i) {
      vectors[i] = new THREE.Vector3().fromArray(vertices[i]).normalize()
    }
    var cg = chamfer_geom(vectors, faces, chamfer)
    var geom = make_geom(cg.vectors, cg.faces, radius, tab, af)
    //var geom = make_geom(vectors, faces, radius, tab, af); // Without chamfer
    geom.cannon_shape = create_shape(vectors, faces, radius)
    return geom
  }

  function calc_texture_size(approx) {
    return Math.pow(2, Math.floor(Math.log(approx) / Math.log(2)))
  }

  const create_dice_materials = (face_labels, size, margin) => {
    function create_text_texture(text, color, back_color) {
      if (text == undefined) return null
      var canvas = document.createElement('canvas')
      var context = canvas.getContext('2d')
      var ts = calc_texture_size(size + size * 2 * margin) * 2
      canvas.width = canvas.height = ts
      context.font = ts / (1 + 2 * margin) + 'pt Arial'
      context.fillStyle = back_color
      context.fillRect(0, 0, canvas.width, canvas.height)
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.fillStyle = color
      context.fillText(text, canvas.width / 2, canvas.height / 2)
      if (text == '6' || text == '9') {
        context.fillText('  .', canvas.width / 2, canvas.height / 2)
      }
      var texture = new THREE.Texture(canvas)
      texture.needsUpdate = true
      return texture
    }
    var materials = []
    for (var i = 0; i < face_labels.length; ++i)
      materials.push(
        new THREE.MeshPhongMaterial(
          copyto(material_dice_options, {
            map: create_text_texture(face_labels[i], label_color, dice_color),
          })
        )
      )
    return materials
  }

  const create_d4_materials = (size, margin, labels) => {
    function create_d4_text(text, color, back_color) {
      var canvas = document.createElement('canvas')
      var context = canvas.getContext('2d')
      var ts = calc_texture_size(size + margin) * 2
      canvas.width = canvas.height = ts
      context.font = (ts - margin) / 1.5 + 'pt Arial'
      context.fillStyle = back_color
      context.fillRect(0, 0, canvas.width, canvas.height)
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.fillStyle = color
      for (var i in text) {
        context.fillText(
          text[i],
          canvas.width / 2,
          canvas.height / 2 - ts * 0.3
        )
        context.translate(canvas.width / 2, canvas.height / 2)
        context.rotate((Math.PI * 2) / 3)
        context.translate(-canvas.width / 2, -canvas.height / 2)
      }
      var texture = new THREE.Texture(canvas)
      texture.needsUpdate = true
      return texture
    }
    var materials = []
    for (var i = 0; i < labels.length; ++i)
      materials.push(
        new THREE.MeshPhongMaterial(
          copyto(material_dice_options, {
            map: create_d4_text(labels[i], label_color, dice_color),
          })
        )
      )
    return materials
  }

  const create_d4_geometry = radius => {
    var vertices = [
      [1, 1, 1],
      [-1, -1, 1],
      [-1, 1, -1],
      [1, -1, -1],
    ]
    var faces = [
      [1, 0, 2, 1],
      [0, 1, 3, 2],
      [0, 3, 2, 3],
      [1, 2, 3, 4],
    ]
    return create_geom(vertices, faces, radius, -0.1, (Math.PI * 7) / 6, 0.96)
  }

  const create_d6_geometry = radius => {
    var vertices = [
      [-1, -1, -1],
      [1, -1, -1],
      [1, 1, -1],
      [-1, 1, -1],
      [-1, -1, 1],
      [1, -1, 1],
      [1, 1, 1],
      [-1, 1, 1],
    ]
    var faces = [
      [0, 3, 2, 1, 1],
      [1, 2, 6, 5, 2],
      [0, 1, 5, 4, 3],
      [3, 7, 6, 2, 4],
      [0, 4, 7, 3, 5],
      [4, 5, 6, 7, 6],
    ]
    return create_geom(vertices, faces, radius, 0.1, Math.PI / 4, 0.96)
  }

  const create_d8_geometry = radius => {
    var vertices = [
      [1, 0, 0],
      [-1, 0, 0],
      [0, 1, 0],
      [0, -1, 0],
      [0, 0, 1],
      [0, 0, -1],
    ]
    var faces = [
      [0, 2, 4, 1],
      [0, 4, 3, 2],
      [0, 3, 5, 3],
      [0, 5, 2, 4],
      [1, 3, 4, 5],
      [1, 4, 2, 6],
      [1, 2, 5, 7],
      [1, 5, 3, 8],
    ]
    return create_geom(vertices, faces, radius, 0, -Math.PI / 4 / 2, 0.965)
  }

  const create_d10_geometry = radius => {
    var a = (Math.PI * 2) / 10,
      k = Math.cos(a),
      h = 0.105,
      v = -1
    var vertices = []
    for (var i = 0, b = 0; i < 10; ++i, b += a)
      vertices.push([Math.cos(b), Math.sin(b), h * (i % 2 ? 1 : -1)])
    vertices.push([0, 0, -1])
    vertices.push([0, 0, 1])
    var faces = [
      [5, 7, 11, 0],
      [4, 2, 10, 1],
      [1, 3, 11, 2],
      [0, 8, 10, 3],
      [7, 9, 11, 4],
      [8, 6, 10, 5],
      [9, 1, 11, 6],
      [2, 0, 10, 7],
      [3, 5, 11, 8],
      [6, 4, 10, 9],
      [1, 0, 2, v],
      [1, 2, 3, v],
      [3, 2, 4, v],
      [3, 4, 5, v],
      [5, 4, 6, v],
      [5, 6, 7, v],
      [7, 6, 8, v],
      [7, 8, 9, v],
      [9, 8, 0, v],
      [9, 0, 1, v],
    ]
    return create_geom(vertices, faces, radius, 0, (Math.PI * 6) / 5, 0.945)
  }

  const create_d12_geometry = radius => {
    var p = (1 + Math.sqrt(5)) / 2,
      q = 1 / p
    var vertices = [
      [0, q, p],
      [0, q, -p],
      [0, -q, p],
      [0, -q, -p],
      [p, 0, q],
      [p, 0, -q],
      [-p, 0, q],
      [-p, 0, -q],
      [q, p, 0],
      [q, -p, 0],
      [-q, p, 0],
      [-q, -p, 0],
      [1, 1, 1],
      [1, 1, -1],
      [1, -1, 1],
      [1, -1, -1],
      [-1, 1, 1],
      [-1, 1, -1],
      [-1, -1, 1],
      [-1, -1, -1],
    ]
    var faces = [
      [2, 14, 4, 12, 0, 1],
      [15, 9, 11, 19, 3, 2],
      [16, 10, 17, 7, 6, 3],
      [6, 7, 19, 11, 18, 4],
      [6, 18, 2, 0, 16, 5],
      [18, 11, 9, 14, 2, 6],
      [1, 17, 10, 8, 13, 7],
      [1, 13, 5, 15, 3, 8],
      [13, 8, 12, 4, 5, 9],
      [5, 4, 14, 9, 15, 10],
      [0, 12, 8, 10, 16, 11],
      [3, 19, 7, 17, 1, 12],
    ]
    return create_geom(vertices, faces, radius, 0.2, -Math.PI / 4 / 2, 0.968)
  }

  const create_d20_geometry = radius => {
    var t = (1 + Math.sqrt(5)) / 2
    var vertices = [
      [-1, t, 0],
      [1, t, 0],
      [-1, -t, 0],
      [1, -t, 0],
      [0, -1, t],
      [0, 1, t],
      [0, -1, -t],
      [0, 1, -t],
      [t, 0, -1],
      [t, 0, 1],
      [-t, 0, -1],
      [-t, 0, 1],
    ]
    var faces = [
      [0, 11, 5, 1],
      [0, 5, 1, 2],
      [0, 1, 7, 3],
      [0, 7, 10, 4],
      [0, 10, 11, 5],
      [1, 5, 9, 6],
      [5, 11, 4, 7],
      [11, 10, 2, 8],
      [10, 7, 6, 9],
      [7, 1, 8, 10],
      [3, 9, 4, 11],
      [3, 4, 2, 12],
      [3, 2, 6, 13],
      [3, 6, 8, 14],
      [3, 8, 9, 15],
      [4, 9, 5, 16],
      [2, 4, 11, 17],
      [6, 2, 10, 18],
      [8, 6, 7, 19],
      [9, 8, 1, 20],
    ]
    return create_geom(vertices, faces, radius, -0.2, -Math.PI / 4 / 2, 0.955)
  }

  const create_d4 = () => {
    if (!this.d4_geometry)
      this.d4_geometry = this.create_d4_geometry(scale * 1.2)
    if (!this.d4_material)
      this.d4_material = this.create_d4_materials(
        scale / 2,
        scale * 2,
        d4_labels[0]
      )

    return new THREE.Mesh(this.d4_geometry, this.d4_material)
  }

  const create_d6 = () => {
    if (!this.d6_geometry)
      this.d6_geometry = this.create_d6_geometry(scale * 0.9)
    if (!this.dice_material)
      this.dice_material = this.create_dice_materials(
        standart_d20_dice_face_labels,
        scale / 2,
        1.0
      )
    return new THREE.Mesh(this.d6_geometry, this.dice_material)
  }

  const create_d8 = () => {
    if (!this.d8_geometry) this.d8_geometry = this.create_d8_geometry(scale)
    if (!this.dice_material)
      this.dice_material = this.create_dice_materials(
        standart_d20_dice_face_labels,
        scale / 2,
        1.2
      )
    return new THREE.Mesh(this.d8_geometry, this.dice_material)
  }

  const create_d10 = () => {
    if (!this.d10_geometry)
      this.d10_geometry = this.create_d10_geometry(scale * 0.9)
    if (!this.dice_material)
      this.dice_material = this.create_dice_materials(
        standart_d20_dice_face_labels,
        scale / 2,
        1.0
      )
    return new THREE.Mesh(this.d10_geometry, this.dice_material)
  }

  const create_d12 = () => {
    if (!this.d12_geometry)
      this.d12_geometry = this.create_d12_geometry(scale * 0.9)
    if (!this.dice_material)
      this.dice_material = this.create_dice_materials(
        standart_d20_dice_face_labels,
        scale / 2,
        1.0
      )

    return new THREE.Mesh(this.d12_geometry, this.dice_material)
  }

  const create_d20 = () => {
    if (!this.d20_geometry) this.d20_geometry = this.create_d20_geometry(scale)
    if (!this.dice_material)
      this.dice_material = this.create_dice_materials(
        standart_d20_dice_face_labels,
        scale / 2,
        1.0
      )

    return new THREE.Mesh(this.d20_geometry, this.dice_material)
  }

  const parse_notation = notation => {
    var no = notation.split('@')
    var dr0 = /\s*(\d*)([a-z]+)(\d+)(\s*(\+|\-)\s*(\d+)){0,1}\s*(\+|$)/gi
    var dr1 = /(\b)*(\d+)(\b)*/gi
    var ret = { set: [], constant: 0, result: [], error: false },
      res
    while ((res = dr0.exec(no[0]))) {
      var command = res[2]
      if (command != 'd') {
        ret.error = true
        continue
      }
      var count = parseInt(res[1])
      if (res[1] == '') count = 1
      var type = 'd' + res[3]
      if (known_types.indexOf(type) == -1) {
        ret.error = true
        continue
      }
      while (count--) ret.set.push(type)
      if (res[5] && res[6]) {
        if (res[5] == '+') ret.constant += parseInt(res[6])
        else ret.constant -= parseInt(res[6])
      }
    }
    while ((res = dr1.exec(no[1]))) {
      ret.result.push(parseInt(res[2]))
    }
    return ret
  }

  const stringify_notation = nn => {
    var dict = {},
      notation = ''
    for (var i in nn.set)
      if (!dict[nn.set[i]]) dict[nn.set[i]] = 1
      else ++dict[nn.set[i]]
    for (var i in dict) {
      if (notation.length) notation += ' + '
      notation += (dict[i] > 1 ? dict[i] : '') + i
    }
    if (nn.constant) {
      if (nn.constant > 0) notation += ' + ' + nn.constant
      else notation += ' - ' + Math.abs(nn.constant)
    }
    return notation
  }

  const dice_box = () => {
    scene = new THREE.Scene()
    world = new CANNON.World()

    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    renderer.setSize(width, height)
    renderer.setClearColor(0xffffff, 0)

    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0xff00ff })
    const cube = new THREE.Mesh(geometry, material)

    camera.position.z = 4
    scene.add(cube)
    const that = this

    //container.appendChild(this.renderer.domElement)

    //this.reinit(container, dimentions)

    world.gravity.set(0, 0, -9.8 * 800)
    world.broadphase = new CANNON.NaiveBroadphase()
    world.solver.iterations = 16

    var ambientLight = new THREE.AmbientLight(ambient_light_color)
    scene.add(ambientLight)

    let dice_body_material = new CANNON.Material()
    let desk_body_material = new CANNON.Material()
    let barrier_body_material = new CANNON.Material()

    world.addContactMaterial(
      new CANNON.ContactMaterial(desk_body_material, dice_body_material, {
        friction: 0.01,
        restitution: 0.5,
      })
    )

    world.addContactMaterial(
      new CANNON.ContactMaterial(barrier_body_material, dice_body_material, {
        friction: 0,
        restitution: 1.0,
      })
    )

    world.addContactMaterial(
      new CANNON.ContactMaterial(dice_body_material, dice_body_material, {
        friction: 0,
        restitution: 0.5,
      })
    )

    world.add(new CANNON.Body(0, new CANNON.Plane(), desk_body_material))

    var barrier
    barrier = new CANNON.Body(0, new CANNON.Plane(), barrier_body_material)
    barrier.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2)
    barrier.position.set(0, 500 * 0.93, 0)
    world.add(barrier)

    barrier = new CANNON.Body(0, new CANNON.Plane(), barrier_body_material)
    barrier.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2)
    barrier.position.set(0, -500 * 0.93, 0)
    world.add(barrier)

    barrier = new CANNON.Body(0, new CANNON.Plane(), barrier_body_material)
    barrier.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 2)
    barrier.position.set(500 * 0.93, 0, 0)
    world.add(barrier)

    barrier = new CANNON.Body(0, new CANNON.Plane(), barrier_body_material)
    barrier.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI / 2)
    barrier.position.set(-500 * 0.93, 0, 0)
    world.add(barrier)

    var last_time = 0
    var running = false

    const reinit = (container, dimentions) => {
      let cw = width / 2
      let ch = height / 2

      let w = cw
      let h = ch

      if (dimentions) {
        let w = dimentions.w
        let h = dimentions.h
      }

      let aspect = Math.min(cw / w, ch / h)
      scale = Math.sqrt(w * w + h * h) / 13

      renderer.setSize(cw * 2, ch * 2)

      let wh = ch / aspect / Math.tan((10 * Math.PI) / 180)
      if (camera) scene.remove(camera)
      camera = new THREE.PerspectiveCamera(20, cw / ch, 1, wh * 1.3)
      camera.position.z = wh

      var mw = Math.max(w, h)

      if (light) scene.remove(light)
      light = new THREE.SpotLight(spot_light_color, 2.0)
      light.position.set(-mw / 2, mw / 2, mw * 2)
      light.target.position.set(0, 0, 0)
      light.distance = mw * 5
      light.castShadow = true
      light.shadow.camera.near = mw / 10
      light.shadow.camera.far = mw * 5
      light.shadow.camera.fov = 50
      light.shadow.bias = 0.001
      light.shadow.mapSize.width = 1024
      light.shadow.mapSize.height = 1024
      scene.add(light)

      if (desk) scene.remove(desk)
      desk = new THREE.Mesh()
      new THREE.PlaneGeometry(w * 2, h * 2, 1, 1)
      desk.receiveShadow = use_shadows
      scene.add(desk)

      renderer.render(scene, camera)
    }

    //reinit()

    function make_random_vector(vector) {
      var random_angle = (rnd() * Math.PI) / 5 - Math.PI / 5 / 2
      var vec = {
        x:
          vector.x * Math.cos(random_angle) - vector.y * Math.sin(random_angle),
        y:
          vector.x * Math.sin(random_angle) + vector.y * Math.cos(random_angle),
      }
      if (vec.x == 0) vec.x = 0.01
      if (vec.y == 0) vec.y = 0.01
      return vec
    }

    const generate_vectors = (notation, vector, boost) => {
      var vectors = []
      for (var i in notation.set) {
        var vec = make_random_vector(vector)
        var pos = {
          x: this.w * (vec.x > 0 ? -1 : 1) * 0.9,
          y: this.h * (vec.y > 0 ? -1 : 1) * 0.9,
          z: rnd() * 200 + 200,
        }
        var projector = Math.abs(vec.x / vec.y)
        if (projector > 1.0) pos.y /= projector
        else pos.x *= projector
        var velvec = make_random_vector(vector)
        var velocity = { x: velvec.x * boost, y: velvec.y * boost, z: -10 }
        var inertia = dice_inertia[notation.set[i]]
        var angle = {
          x: -(rnd() * vec.y * 5 + inertia * vec.y),
          y: rnd() * vec.x * 5 + inertia * vec.x,
          z: 0,
        }
        var axis = { x: rnd(), y: rnd(), z: rnd(), a: rnd() }
        vectors.push({
          set: notation.set[i],
          pos: pos,
          velocity: velocity,
          angle: angle,
          axis: axis,
        })
      }
      return vectors
    }

    const create_dice = (type, pos, velocity, angle, axis) => {
      var dice = that['create_' + type]()
      dice.castShadow = true
      dice.dice_type = type
      dice.body = new CANNON.RigidBody(
        dice_mass[type],
        dice.geometry.cannon_shape,
        dice_body_material
      )
      dice.body.position.set(pos.x, pos.y, pos.z)
      dice.body.quaternion.setFromAxisAngle(
        new CANNON.Vec3(axis.x, axis.y, axis.z),
        axis.a * Math.PI * 2
      )
      dice.body.angularVelocity.set(angle.x, angle.y, angle.z)
      dice.body.velocity.set(velocity.x, velocity.y, velocity.z)
      dice.body.linearDamping = 0.1
      dice.body.angularDamping = 0.1
      scene.add(dice)
      dices.push(dice)
      world.add(dice.body)
    }

    const check_if_throw_finished = () => {
      var res = true
      var e = 6
      if (this.iteration < 10 / frame_rate) {
        for (var i = 0; i < this.dices.length; ++i) {
          var dice = this.dices[i]
          if (dice.dice_stopped === true) continue
          var a = dice.body.angularVelocity,
            v = dice.body.velocity
          if (
            Math.abs(a.x) < e &&
            Math.abs(a.y) < e &&
            Math.abs(a.z) < e &&
            Math.abs(v.x) < e &&
            Math.abs(v.y) < e &&
            Math.abs(v.z) < e
          ) {
            if (dice.dice_stopped) {
              if (this.iteration - dice.dice_stopped > 3) {
                dice.dice_stopped = true
                continue
              }
            } else dice.dice_stopped = this.iteration
            res = false
          } else {
            dice.dice_stopped = undefined
            res = false
          }
        }
      }
      return res
    }

    function get_dice_value(dice) {
      var vector = new THREE.Vector3(0, 0, dice.dice_type == 'd4' ? -1 : 1)
      var closest_face,
        closest_angle = Math.PI * 2
      for (var i = 0, l = dice.geometry.faces.length; i < l; ++i) {
        var face = dice.geometry.faces[i]
        if (face.materialIndex == 0) continue
        var angle = face.normal
          .clone()
          .applyQuaternion(dice.body.quaternion)
          .angleTo(vector)
        if (angle < closest_angle) {
          closest_angle = angle
          closest_face = face
        }
      }
      var matindex = closest_face.materialIndex - 1
      if (dice.dice_type == 'd100') matindex *= 10
      if (dice.dice_type == 'd10' && matindex == 0) matindex = 10
      return matindex
    }

    function get_dice_values(dices) {
      var values = []
      for (var i = 0, l = dices.length; i < l; ++i) {
        values.push(get_dice_value(dices[i]))
      }
      return values
    }

    const emulate_throw = () => {
      while (!this.check_if_throw_finished()) {
        ++this.iteration
        this.world.step(frame_rate)
      }
      return get_dice_values(this.dices)
    }

    const __animate = threadid => {
      var time = new Date().getTime()
      var time_diff = (time - this.last_time) / 1000
      if (time_diff > 3) time_diff = frame_rate
      ++this.iteration
      if (use_adapvite_timestep) {
        while (time_diff > frame_rate * 1.1) {
          this.world.step(frame_rate)
          time_diff -= frame_rate
        }
        this.world.step(time_diff)
      } else {
        this.world.step(frame_rate)
      }
      for (var i in this.scene.children) {
        var interact = this.scene.children[i]
        if (interact.body != undefined) {
          interact.position.copy(interact.body.position)
          interact.quaternion.copy(interact.body.quaternion)
        }
      }
      this.renderer.render(this.scene, this.camera)
      this.last_time = this.last_time ? time : new Date().getTime()
      if (this.running == threadid && this.check_if_throw_finished()) {
        this.running = false
        if (this.callback) this.callback.call(this, get_dice_values(this.dices))
      }
      if (this.running == threadid) {
        ;(function (t, tid, uat) {
          if (!uat && time_diff < frame_rate) {
            setTimeout(function () {
              requestAnimationFrame(function () {
                t.__animate(tid)
              })
            }, (frame_rate - time_diff) * 1000)
          } else
            requestAnimationFrame(function () {
              t.__animate(tid)
            })
        })(this, threadid, use_adapvite_timestep)
      }
    }

    const clear = () => {
      this.running = false
      var dice
      while ((dice = this.dices.pop())) {
        this.scene.remove(dice)
        if (dice.body) this.world.remove(dice.body)
      }
      if (this.pane) this.scene.remove(this.pane)
      this.renderer.render(this.scene, this.camera)
      var box = this
      setTimeout(function () {
        box.renderer.render(box.scene, box.camera)
      }, 100)
    }

    const prepare_dices_for_roll = vectors => {
      this.clear()
      this.iteration = 0
      for (var i in vectors) {
        this.create_dice(
          vectors[i].set,
          vectors[i].pos,
          vectors[i].velocity,
          vectors[i].angle,
          vectors[i].axis
        )
      }
    }

    function shift_dice_faces(dice, value, res) {
      var r = dice_face_range[dice.dice_type]
      if (dice.dice_type == 'd10' && value == 10) value = 0
      if (!(value >= r[0] && value <= r[1])) return
      var num = value - res
      var geom = dice.geometry.clone()
      for (var i = 0, l = geom.faces.length; i < l; ++i) {
        var matindex = geom.faces[i].materialIndex
        if (matindex == 0) continue
        matindex += num - 1
        while (matindex > r[1]) matindex -= r[1]
        while (matindex < r[0]) matindex += r[1]
        geom.faces[i].materialIndex = matindex + 1
      }
      if (dice.dice_type == 'd4' && num != 0) {
        if (num < 0) num += 4
        dice.material = [
          this.create_d4_materials(scale / 2, scale * 2, d4_labels[num]),
        ]
      }
      dice.geometry = geom
    }

    const roll = (vectors, values, callback) => {
      this.prepare_dices_for_roll(vectors)
      if (values != undefined && values.length) {
        use_adapvite_timestep = false
        var res = this.emulate_throw()
        this.prepare_dices_for_roll(vectors)
        for (var i in res) shift_dice_faces(this.dices[i], values[i], res[i])
      }
      this.callback = callback
      this.running = new Date().getTime()
      this.last_time = 0
      this.__animate(this.running)
    }

    const search_dice_by_mouse = ev => {
      var m = get_mouse_coords(ev)
      var intersects = new THREE.Raycaster(
        this.camera.position,
        new THREE.Vector3(
          (m.x - this.cw) / this.aspect,
          1 - (m.y - this.ch) / this.aspect,
          this.w / 9
        )
          .sub(this.camera.position)
          .normalize()
      ).intersectObjects(this.dices)
      if (intersects.length) return intersects[0].object.userData
    }

    function throw_dices(
      box,
      vector,
      boost,
      dist,
      notation_getter,
      before_roll,
      after_roll
    ) {
      var uat = use_adapvite_timestep
      function roll(request_results) {
        if (after_roll) {
          box.clear()
          box.roll(vectors, request_results || notation.result, function (
            result
          ) {
            if (after_roll) after_roll.call(box, notation, result)
            box.rolling = false
            use_adapvite_timestep = uat

            // console.log('dado', result)
            // console.log('notation', notation.set[0])
            // console.log('dices', result.length)
          })
        }
      }
      vector.x /= dist
      vector.y /= dist
      var notation = notation_getter.call(box)
      if (notation.set.length == 0) return
      var vectors = box.generate_vectors(notation, vector, boost)
      box.rolling = true
      if (before_roll) before_roll.call(box, vectors, notation, roll)
      else roll()
    }

    const bind_mouse = (
      container,
      notation_getter,
      before_roll,
      after_roll
    ) => {
      var box = this
      bind(container, ['mousedown', 'touchstart'], function (ev) {
        //ev.preventDefault()
        box.mouse_time = new Date().getTime()
        box.mouse_start = get_mouse_coords(ev)
      })

      bind(container, ['mouseup', 'touchend'], function (ev) {
        if (box.rolling) return
        if (box.mouse_start == undefined) return
        ev.stopPropagation()
        var m = get_mouse_coords(ev)
        var vector = {
          x: m.x - box.mouse_start.x,
          y: -(m.y - box.mouse_start.y),
        }
        box.mouse_start = undefined
        var dist = Math.sqrt(vector.x * vector.x + vector.y * vector.y)
        if (dist < Math.sqrt(box.w * box.h * 0.01)) return
        var time_int = new Date().getTime() - box.mouse_time
        if (time_int > 2000) time_int = 2000
        var boost = Math.sqrt((2500 - time_int) / 2500) * dist * 2
        prepare_rnd(function () {
          throw_dices(
            box,
            vector,
            boost,
            dist,
            notation_getter,
            before_roll,
            after_roll
          )
        })
      })
    }

    const bind_throw = (button, notation_getter, before_roll, after_roll) => {
      var box = this
      bind(button, ['mouseup', 'touchend'], function (ev) {
        ev.stopPropagation()
        box.start_throw(notation_getter, before_roll, after_roll)
      })
    }

    const start_throw = (notation_getter, before_roll, after_roll) => {
      var box = this
      if (box.rolling) return
      prepare_rnd(function () {
        var vector = { x: (rnd() * 2 - 1) * box.w, y: -(rnd() * 2 - 1) * box.h }
        var dist = Math.sqrt(vector.x * vector.x + vector.y * vector.y)
        var boost = (rnd() + 3) * dist
        throw_dices(
          box,
          vector,
          boost,
          dist,
          notation_getter,
          before_roll,
          after_roll
        )
      })
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
      frameId = window.requestAnimationFrame(animate)
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
