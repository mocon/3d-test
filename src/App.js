import React, { useRef, useState, useEffect, Suspense } from 'react'
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
  const [isEntered, setIsEntered] = useState(false)
  const { positionY, rotationY, opacity } = useSpring({
    positionY: isEntered ? 0 : -5,
    rotationY: isEntered ? 1.5708 : 1.5708 * 8,
    opacity: isEntered ? 1 : 0,
    config: { mass: 6, tension: 200, friction: 60 },
  })

  useEffect(() => {
    setIsEntered(true)
  }, [])

  useFrame(() => {
    ref.current.rotation.y += 0.001
  })

  return (
    <a.mesh position-y={positionY} rotation-y={rotationY} opacity={opacity}>
      <primitive ref={ref} object={gltf.scene} position={[0, 0, 0]} />
    </a.mesh>
  )
}

function Ring() {
  const ref = useRef()

  return (
    <a.mesh ref={ref} position-y={-0.46} rotation-x={-1.5708}>
      <ringBufferGeometry attach='geometry' args={[0.9, 0.91, 100]} />
      <meshLambertMaterial attach='material' color='white' />
    </a.mesh>
  )
}

function Pedestal() {
  const ref = useRef()
  const [isEntered, setIsEntered] = useState(false)
  const { positionY, opacity } = useSpring({
    positionY: isEntered ? -1.21 : -20,
    opacity: isEntered ? 1 : 0,
    config: { mass: 1, tension: 200, friction: 50 },
  })

  // const location = useControl('Location', {
  //   type: 'number',
  //   min: -10,
  //   max: 10,
  // })

  useEffect(() => {
    setIsEntered(true)
  }, [])

  return (
    <a.mesh ref={ref} position-y={positionY} opacity={opacity}>
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
  const [isEntered, setIsEntered] = useState(false)

  useEffect(() => {
    setIsEntered(true)
  }, [])

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
        <h1 className={isEntered && 'entered'}>Nike Air Zoom Pegasus 36</h1>
      </main>
    </>
  )
}

export default App
