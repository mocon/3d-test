import React, { useRef, Suspense } from 'react'
import { OrbitControls } from 'drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Canvas, useFrame, useLoader } from 'react-three-fiber'
import { a, useSpring } from 'react-spring/three'
import { Controls, useControl } from 'react-three-gui'

import './App.css'

const isDev = process.env.NODE_ENV === 'development' ? true : false

function Shoe() {
  const ref = useRef()
  const gltf = useLoader(GLTFLoader, `${isDev ? '' : '/3d-test'}/scene.gltf`)

  useFrame(() => {
    ref.current.rotation.y += 0.001
  })

  return (
    <primitive
      ref={ref}
      object={gltf.scene}
      position={[0, 0, 0]}
      rotation-y={1.5708}
    />
  )
}

function Ring(props) {
  const ref = useRef()
  // const size = useControl('Size', {
  //   type: 'number',
  //   min: 0.8,
  //   max: 0.99,
  // })

  return (
    <a.mesh ref={ref} {...props} position-y={-0.46} rotation-x={-1.5708}>
      <ringBufferGeometry attach='geometry' args={[0.9, 0.91, 100]} />
      <meshLambertMaterial attach='material' color='white' />
    </a.mesh>
  )
}

function Pedestal(props) {
  const ref = useRef()

  return (
    <a.mesh ref={ref} {...props} position-y={-1.21}>
      <cylinderBufferGeometry attach='geometry' args={[0.9, 1.2, 1.5, 120]} />
      <meshPhongMaterial
        flatShading={true}
        roughness={0.5}
        metalness={0.8}
        shininess={5}
        attach='material'
        color='#050505'
      />
    </a.mesh>
  )
}

function Scene() {
  return (
    <>
      <ambientLight />
      <pointLight intensity={1} position={[10, 2, 4]} />
      <pointLight intensity={1} position={[-10, 2, 4]} />
      <Suspense fallback={null}>
        <Shoe />
      </Suspense>
      <Ring />
      <Pedestal />
      <OrbitControls enablePan={false} zoomSpeed={0.2} />
    </>
  )
}

function App() {
  return (
    <>
      <Canvas
        camera={{
          position: [0, 0, 2],
        }}
      >
        <Scene />
      </Canvas>
      {/* <Controls /> */}
      <main>
        <h1>Nike Air Zoom Pegasus 36</h1>
      </main>
    </>
  )
}

export default App
