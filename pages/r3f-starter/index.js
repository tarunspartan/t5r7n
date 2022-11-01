import React from 'react'
import { useThree, Canvas, useFrame, extend } from '@react-three/fiber'
import { useRef } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { ACESFilmicToneMapping, sRGBEncoding } from 'three'

extend({ OrbitControls })

const Experience = () => {

  const cubeRef = useRef()
  const groupRef = useRef()

  const { camera, gl } = useThree()

  useFrame((state, delta) => {
    cubeRef.current.rotation.y += delta
    groupRef.current.rotation.y += delta
  })

  return <>
    <directionalLight position={[1, 2, 3]} intensity={1.5} />
    <ambientLight intensity={0.5} />
    <orbitControls args={[camera, gl.domElement]} />
    <group ref={groupRef}>
      <mesh position-x={- 2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh ref={cubeRef} rotation-y={Math.PI * 0.25} position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
    </group>
    <mesh position-y={-1} rotation-x={- Math.PI * 0.5} scale={10}>
      <planeGeometry />
      <meshStandardMaterial color="greenyellow" />
    </mesh>
  </>
}
const Starter = () => {

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
      <Canvas
        gl={{
          antialias: true,
          toneMapping: ACESFilmicToneMapping,
          outputEncoding: sRGBEncoding
        }}
        camera={{ fov: 45, near: 0.1, far: 200, position: [3, 2, 6] }}>
        <Experience />
      </Canvas>
    </div >
  )
}

export default Starter